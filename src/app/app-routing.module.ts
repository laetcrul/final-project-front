import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {ManageUsersGuard} from "./guards/manage-users.guard";

const routes: Routes = [
  { path: 'event', loadChildren: () => import('./modules/event/event.module')
      .then(t => t.EventModule) },
  {path: 'topic', loadChildren: () => import('./modules/topics/topics.module')
      .then(t => t.TopicsModule)},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', loadChildren: () => import('./modules/user/user.module')
      .then(t=> t.UserModule), canActivate: [ManageUsersGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
