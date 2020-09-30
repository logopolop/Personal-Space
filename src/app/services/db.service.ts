import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'; 
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { PersonalSpace } from '../models/personal-space';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private personalSpaceCollection: AngularFirestoreCollection<PersonalSpace>;
  personalSpaces: Observable<PersonalSpace[]>;
  collectionName: string = 'personal-space';

  constructor(private afs: AngularFirestore) { 
    this.personalSpaceCollection = afs.collection<PersonalSpace>(this.collectionName);
    this.personalSpaces = this.personalSpaceCollection.valueChanges();
  }

  createPersonalSpace(user) {
    return this.personalSpaceCollection.doc(`ps-${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: Date.now()
    });
  }
  
  readPersonalSpaces(): Observable<PersonalSpace[]> {
    return this.personalSpaces;
  }

  readPersonalSpaceByUID(uid: string) {
    return this
      .afs
      .collection(this.collectionName, ref => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  updatePersonalSpacePhotoURLs(user, photoURL) {
    return this.afs
      .collection(this.collectionName)
      .doc(`ps-${user.uid}`)
      .update({
        photoURLs: firestore.FieldValue.arrayUnion(photoURL)
      });
  }
}
