import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { routeGuard } from './Utils/route.guard';
import { authGuard } from './Utils/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate:[authGuard],
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate:[routeGuard],
    loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
