import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css']
})
export class PhotoAlbumComponent implements OnInit, OnDestroy {
  photo = {
    title: '',
    file: ''
  };

  waitingUpload: Boolean;

  user: User;
  userSub: Subscription;
  photoServerURL: any;
  uploadedImgURL: any;
  uploadProgress;

  constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.userSub = this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  onFileChange(e) { 
    console.log(e.target.files[0]);
    
    this.photo.file = e.target.files[0];
  }

  postPhoto() {
    this.waitingUpload = true;

    const uid = this.user.uid;
    const photoPathOnServer = `personal-space/${uid}/${this.photo.title}`;
    const photoRef = this.afStorage.ref(photoPathOnServer);

    const currentUpload = this.afStorage.upload(photoPathOnServer, this.photo.file);

    currentUpload.catch((err) => console.error(err));

    this.uploadProgress = currentUpload.percentageChanges();

    currentUpload
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.photoServerURL = photoRef.getDownloadURL();
          console.log('photoServerURL : ', this.photoServerURL);

          this.photoServerURL.subscribe((data) => {
            console.log('data : ', data);
            this.uploadedImgURL = data;
          }); 
        })
      ).subscribe();

    this.waitingUpload = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
