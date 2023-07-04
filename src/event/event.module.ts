import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, FirebaseService],
})
export class EventModule {}
