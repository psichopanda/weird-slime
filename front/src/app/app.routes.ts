import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path: '', component: TeamsComponent, title: 'Teams'},
    {path: 'people', component: HomeComponent, title: 'People'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'profile', component: ProfileComponent, title: 'Profile'},
];
