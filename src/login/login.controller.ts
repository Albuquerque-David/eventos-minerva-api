import { Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import * as common from '@nestjs/common';
import { LoginInput } from './model/LoginInput';
import { SignUpInput } from './model/SignUpInput';
import { LoginResponse } from './model/LoginResponse';
import { Request } from 'express';

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
  async getUserData(@Req() request: Request) {
    const token = this.extractToken(request);
    const result = await this.loginService.getUserData(token);
    return result;
  }

  @Post('/logout')
  async logout() {
    const result = await this.loginService.logout();
    return result;
  }

  private extractToken(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substr(7);
      // Agora você tem o valor completo do token Bearer
      return token;
    } else {
      return '';
    }
  }
}
