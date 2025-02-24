import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [
    {path: '', component: TeamsComponent, title: 'Teams'},
    {path: 'people', component: HomeComponent, title: 'Pople'},
    {path: 'login', component: LoginComponent, title: 'Login'}
];
