import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginService } from './login.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, FirebaseService],
})
export class LoginModule {}
