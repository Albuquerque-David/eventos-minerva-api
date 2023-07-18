import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class LoginService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login(email: string, password: string) {
    const token = await this.firebaseService.login(email, password);
    return token;
  }

  async signUp(email: string, password: string) {
    const user = await this.firebaseService.signup(email, password);
    return user;
  }

  async getUserData(token: string) {
    const user = await this.firebaseService.getUserData(token);
    return user;
  }

  async logout() {
    const user = await this.firebaseService.logout();
    return user;
  }
}
