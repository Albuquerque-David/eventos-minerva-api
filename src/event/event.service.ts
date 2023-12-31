import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { UUID, randomUUID } from 'crypto';
import { EventModel } from './model/Event';

@Injectable()
export class EventService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createEvent(
    name: string,
    description: string,
    local: string,
    date: Date,
    category: string,
    image: Express.Multer.File,
    schedule: Array<any>,
  ) {
    const db = getFirestore();
    const uid = randomUUID();
    await this.firebaseService.uploadFile(
      image,
      `${uid}-${image.originalname}`,
    );
    const event = await setDoc(doc(db, 'events', uid), {
      id: uid,
      name: name,
      description: description,
      local: local,
      date: date,
      category: category,
      image: `${uid}-${image.originalname}`,
      schedule: schedule,
    });
    return event;
  }

  async getAllEvents() {
    const db = getFirestore();
    const q = query(collection(db, 'events'));

    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }

  async getEvent(id: string) {
    const db = getFirestore();
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("id", "==", id));

    const querySnapshot = await getDocs(q);
    let data: any;
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });

    return data;
  }
}
