import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Utils/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    AddProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    NgFor,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,

  ]
})
export class ProductsModule { }
