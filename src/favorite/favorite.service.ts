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
import { EventModel } from 'src/event/model/Event';

@Injectable()
export class FavoriteService {
  constructor(private readonly firebaseService: FirebaseService, 
    private readonly loginService: LoginService) {
    }

  favoritesByUser: any = [];

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
    querySnapshot.forEach((doc) => {
      data = doc.ref.id;
    });

    try {
      await deleteDoc(doc(db, "favorites", data));

      return { status: 200 };
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async getFavorites() {
    const db = getFirestore();
    const eventsRef = collection(db, "favorites");

    try {
      const email = await this.loginService.getUserData();
      const q = query(eventsRef, where("emailUser", "==", email));
      const querySnapshot = await getDocs(q);
      const ids: any[] = [];
      querySnapshot.forEach((doc) => {
        ids.push(doc.data().idEvent);
      });

      const allEvents = query(collection(db, 'events'));
      const allEventsByUser = query(allEvents, where("id", "in", ids));
      const querySnapshotEvents = await getDocs(allEventsByUser);
      const data: any[] = [];
      querySnapshotEvents.forEach((doc) => {
        data.push(doc.data());
      });
  
      this.favoritesByUser = data;

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  check(idEvent: string) {
    let flag: boolean = false;
    this.favoritesByUser.forEach((element: EventModel) => {
      if (element.id == idEvent) 
        flag = true;  
      
    });
    
    return flag
  }
}
