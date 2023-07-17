import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { randomUUID } from 'crypto';
import { FavoriteModel } from './model/Favorite';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly firebaseService: FirebaseService, 
    private readonly loginService: LoginService) {}

  async favorite(
    idEvent: string
  ) {
    const db = getFirestore();
    const uid = randomUUID();

    try {
      const email = await this.loginService.getUserData();
      const favorited = await setDoc(doc(db, 'favorites', uid), {
        idEvent: idEvent,
        emailUser: email,
      });
  
      return { status: 200, message: favorited };
    } catch (error) {
      console.log(error)
      return { status: 403, message: "You have to login" } ;
    }
  }

  async unfavorite(
    idEvent: string
  ) {
    const db = getFirestore();
    const favoritesRef = collection(db, "favorites");
    const q = query(favoritesRef, where("idEvent", "==", idEvent));
    const querySnapshot = await getDocs(q);
    
    let data: any;
    console.log("query", querySnapshot);
    querySnapshot.forEach((doc) => {
      data = doc.ref.id;
    });
    console.log('data', data);
    try {
      await deleteDoc(doc(db, "favorites", data));
      return { status: 200 };
    } catch (error) {
      console.log(error)
      return error;
    }
  }
}
