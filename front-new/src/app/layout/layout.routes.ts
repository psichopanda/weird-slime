import { Routes } from "@angular/router";
import { LayoutHomeComponent } from "./components/layout-home/layout-home.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutHomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.routes').then(r => r.routes)
      },
      {
        path: 'admin',
        loadChildren: () => import('./../admin/admin.routes').then(r => r.routes)
      },
    ]
  },
];
