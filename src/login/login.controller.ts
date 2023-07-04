import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginService } from './login.service';
import * as common from '@nestjs/common';
import { LoginInput } from './model/LoginInput';
import { SignUpInput } from './model/SignUpInput';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('/login')
  login(@common.Body() login: LoginInput) {
    const result = this.loginService.login(login.email, login.password);
    return result;
  }

  @Post('/signup')
  signUp(@common.Body() signUp: SignUpInput) {
    const result = this.loginService.signUp(signUp.email, signUp.password);
    return result;
  }

  @Get('/getUserData')
  getUserData() {
    const result = this.loginService.getUserData();
    return result;
  }

  @Post('/logout')
  logout() {
    const result = this.loginService.logout();
    return result;
  }
}
