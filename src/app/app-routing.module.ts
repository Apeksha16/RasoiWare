import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ProductsComponent } from './Components/products/products.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { ManageAddressesComponent } from './Components/manage-addresses/manage-addresses.component';
import { PopularProductsComponent } from './Components/popular-products/popular-products.component';
import { PrivacyPolicyComponent } from './Components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'category',
    pathMatch: 'full',
    component: CategoryComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'view-orders',
    component: ViewOrderComponent,
  },
  {
    path: 'return-policy',
    component: ReturnPolicyComponent,
  },
  {
    path: 'cart-view',
    component: CartViewComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'manage-addresses',
    component: ManageAddressesComponent,
  },
  {
    path: 'popular-products',
    component: PopularProductsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
