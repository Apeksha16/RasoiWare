import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {
  NgbCarouselModule,
  NgbDropdownConfig,
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FirebaseAppModule } from '@angular/fire/app';
import { HomeComponent } from './Components/home/home.component';
import { HomeOldComponent } from './Components/home-old/home-old.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HomeOldComponent, NavbarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbRatingModule,
    NgbNavModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseAppModule,
  ],
  providers: [NgbDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
