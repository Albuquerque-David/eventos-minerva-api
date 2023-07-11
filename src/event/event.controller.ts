import { Controller, Get, HttpException, Post, Res } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from './event.service';
import * as common from '@nestjs/common';
import { EventModel } from './model/Event';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { EventGetDownloadInput } from './model/EventGetDownloadInput';
import axios from 'axios';

@Controller()
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @common.UseInterceptors(FileInterceptor('image'))
  @Post('/event')
  create(
    @common.Body() event: EventModel,
    @common.UploadedFile() image: Express.Multer.File,
  ) {
    const result = this.eventService.createEvent(
      event.name,
      event.description,
      event.local,
      event.date,
      event.category,
      image,
      event.schedule[0].name,
      event.schedule[0].hour,
      event.schedule[0].description,
    );
    return result;
  }

  @Post('/event/downloadImage')
  async downloadImage(
    @common.Body() body: EventGetDownloadInput,
    @Res() res: Response,
  ) {
    const imageUrl = await this.firebaseService.downloadFile(body.imageName);
    try {
      const response = await axios.get(imageUrl, { responseType: 'stream' });

      res.set({
        'Content-Type': response.headers['content-type'],
        'Content-Length': response.headers['content-length'],
        'Content-Disposition': `attachment; filename="${body.imageName}"`,
      });

      response.data.pipe(res);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      res.status(500).send('Erro ao baixar o arquivo.');
    }
  }

  @Get('/events')
  getAll() {
    const result = this.eventService.getEvent();
    return result;
  }
}
