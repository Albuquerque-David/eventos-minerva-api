import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class LoginService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login(email: string, password: string) {
    const user = await this.firebaseService.login(email, password);
    return user;
  }

  async signUp(email: string, password: string) {
    const user = await this.firebaseService.signup(email, password);
    return user;
  }

  async getUserData() {
    const user = await this.firebaseService.getUserData();
    return user;
  }

  async logout() {
    const user = await this.firebaseService.logout();
    return user;
  }
}
