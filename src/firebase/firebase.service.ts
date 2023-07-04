import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

  async getUserData() {
    const auth = getAuth();

    try {
      if (auth.currentUser) {
        return auth.currentUser?.email;
      } else {
        throw new HttpException('Não há usuário autenticado.', 401);
      }
    } catch (error) {
      throw new HttpException(
        'Não foi recuperar dados de usuário. Necessário autenticar.',
        401,
      );
    }
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

  async logout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        return auth;
      })
      .catch((error) => {
        throw new HttpException('Ocorreu um erro ao realizar Logout.', 500);
      });
  }
}
