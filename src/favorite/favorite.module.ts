import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FavoriteService } from './favorite.service';
import { LoginService } from 'src/login/login.service';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [FavoriteService, FirebaseService, LoginService],
})
export class FavoriteModule {}
