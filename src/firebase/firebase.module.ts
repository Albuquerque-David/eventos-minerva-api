import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService],
})
export class FirebaseModule {}
