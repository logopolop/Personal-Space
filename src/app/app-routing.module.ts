import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'album', component: PhotoAlbumComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',   redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
