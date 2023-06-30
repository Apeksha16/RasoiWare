import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'dashboard', loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
