import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as admin from 'firebase-admin';

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

  async getUserData(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken.email;
    } catch (error) {
      throw new HttpException(
        'Não foi recuperar dados de usuário. Necessário autenticar.',
        401,
      );
    }
  }

  async login(email: string, password: string): Promise<any> {
    const auth = getAuth();

    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        return await userCredential.user.getIdToken().then((token) => {
          const email = userCredential.user.email;
          return token;
        });
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

  async uploadFile(file: Express.Multer.File, filename: string) {
    const storage = getStorage();
    const storageRef = ref(storage, filename);
    const metadata = {
      contentType: 'image/jpg',
    };

    await uploadBytes(storageRef, file.buffer, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  async downloadFile(filename: string): Promise<any> {
    const storage = getStorage();
    const starsRef = ref(
      storage,
      `gs://${process.env.STORAGEBUCKET}/${filename}`,
    );

    const url = await getDownloadURL(starsRef)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            throw new NotFoundException();
          case 'storage/unauthorized':
            throw new UnauthorizedException();
          case 'storage/canceled':
            throw new InternalServerErrorException();
          case 'storage/unknown':
            throw new InternalServerErrorException();
        }
      });
    return url;
  }
}
