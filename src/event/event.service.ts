import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore"; 
import { UUID, randomUUID } from 'crypto';
import { EventModel } from './model/Event';

@Injectable()
export class EventService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createEvent(name: string,
    local: string,
    date: Date,
    category: string,
    image: Blob,
    scheduleName: string,
    scheduleHour: Date,
    scheduleDescription: string,
    ) {
        const db = getFirestore();
        const uid = randomUUID();
        const event = await setDoc(doc(db, "events", uid), {
            name: name,
            local: local,
            date: date,
            category: category,
            image: image,
            schedule: [{scheduleName: scheduleName,
                scheduleHour: scheduleHour,
                scheduleDescription: scheduleDescription}]
        });
        return event;
  }

  async getAllEvents() {
    const db = getFirestore();
    const q = query(collection(db, "events"));

    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }

  async getEvent() {
    const db = getFirestore();
    const q = query(collection(db, "events"));

    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }
}