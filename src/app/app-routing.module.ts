import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { LocationComponent } from './location/location.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'location', component: LocationComponent },
  { path: 'album', component: PhotoAlbumComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**',   redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
