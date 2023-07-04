import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from './event.service';
import * as common from '@nestjs/common';
import { EventModel } from './model/Event';

@Controller()
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('/event')
  create(@common.Body() event: EventModel) {
    const result = this.eventService.createEvent(event.name, event.local, event.date, event.category, 
      event.image, event.schedule[0].name, event.schedule[0].hour, event.schedule[0].description);
    return result;
  }

  @Get('/events')
  getAll() {
    const result = this.eventService.getEvent();
    return result;
  }
}
