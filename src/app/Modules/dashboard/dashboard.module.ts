import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { SharedModule } from 'src/app/Utils/shared.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
