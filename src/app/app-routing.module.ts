import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeGuard } from './Utils/route.guard';
import { authGuard } from './Utils/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
