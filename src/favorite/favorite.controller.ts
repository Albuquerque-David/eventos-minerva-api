import { Controller, Delete, Get, HttpException, Param, Post, Res } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FavoriteService } from './favorite.service';
import { FavoriteEventModel } from './model/FavoriteEvent';
import * as common from '@nestjs/common';

@Controller()
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('/favorite')
  create(
    @common.Body() favorite: FavoriteEventModel,
  ) {
    const result = this.favoriteService.favorite(favorite.idEvent);
    return result;
  }

  @Delete('/unfavorite')
  delete(
    @common.Body() favorite: FavoriteEventModel,
  ) {
    const result = this.favoriteService.unfavorite(favorite.idEvent);
    return result;
  }
}
