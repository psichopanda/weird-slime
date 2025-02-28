import { Routes } from "@angular/router";
import { DashboardHomeComponent } from "./components/dashboard-home/dashboard-home.component";
import { DashboardProfileComponent } from './components/dashboard-profile/dashboard-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  }
];
