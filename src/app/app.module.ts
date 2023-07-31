import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbCarouselModule,
  NgbDropdownConfig,
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbNavModule,
  ],
  providers: [NgbDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
