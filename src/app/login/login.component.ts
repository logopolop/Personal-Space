import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result;
  user: User;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    })
  }

  async loginWithGoogle() {
    try {
      this.result = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (err) {
      console.error('loginWithGoogle / error : ', err);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
  }

}
