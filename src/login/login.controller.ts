import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginService } from './login.service';
import * as common from '@nestjs/common';
import { LoginInput } from './model/LoginInput';
import { SignUpInput } from './model/SignUpInput';
import { LoginResponse } from './model/LoginResponse';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(@common.Body() login: LoginInput): Promise<LoginResponse> {
    const token = await this.loginService.login(login.email, login.password);
    const response = new LoginResponse();
    response.email = login.email;
    response.token = token;
    return response;
  }

  @Post('/signup')
  async signUp(@common.Body() signUp: SignUpInput) {
    const result = await this.loginService.signUp(
      signUp.email,
      signUp.password,
    );
    return result;
  }

  @Get('/getUserData')
  async getUserData() {
    const result = await this.loginService.getUserData();
    return result;
  }

  @Post('/logout')
  async logout() {
    const result = await this.loginService.logout();
    return result;
  }
}
