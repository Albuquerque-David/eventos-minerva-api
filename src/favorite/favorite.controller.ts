import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FavoriteService } from './favorite.service';
import { FavoriteEventModel } from './model/FavoriteEvent';
import * as common from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('/favorite')
  create(@Req() request: Request, @common.Body() favorite: FavoriteEventModel) {
    const token = this.extractToken(request);
    const result = this.favoriteService.favorite(favorite.idEvent, token);
    return result;
  }

  @Delete('/unfavorite')
  delete(@common.Body() favorite: FavoriteEventModel) {
    const result = this.favoriteService.unfavorite(favorite.idEvent);
    return result;
  }

  @Get('/favorites')
  get(@Req() request: Request) {
    const token = this.extractToken(request);

    const result = this.favoriteService.getFavorites(token);
    return result;
  }

  @Get('/checkfavorite/:idEvent')
  check(@Req() request: Request, @Param('idEvent') idEvent: string) {
    const token = this.extractToken(request);

    const result = this.favoriteService.check(idEvent, token);
    return result;
  }

  private extractToken(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substr(7);
      return token;
    } else {
      return '';
    }
  }
}
