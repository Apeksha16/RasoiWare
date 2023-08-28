import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {
  NgbAccordionModule,
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
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductsComponent } from './Components/products/products.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    CategoryComponent,
    ProductsComponent,
    ContactUsComponent,
    QuickViewComponent,
    ViewOrderComponent,
    ReturnPolicyComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbRatingModule,
    NgbNavModule,
    NgbAccordionModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseAppModule,
  ],
  providers: [NgbDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
