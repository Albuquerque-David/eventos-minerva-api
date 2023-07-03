import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable()
export class FirebaseService {
  async signup(email: string, password: string) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new FirebaseError(errorCode, errorMessage);
      });
  }

  async login(email: string, password: string) {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        throw new HttpException(
          'Não foi possível autenticar. Usuário ou senha inválidos',
          403,
        );
      });
  }
}
