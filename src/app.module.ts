import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { FirebaseModule } from './firebase/firebase.module';
import { EventModule } from './event/event.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [LoginModule, FirebaseModule, EventModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
