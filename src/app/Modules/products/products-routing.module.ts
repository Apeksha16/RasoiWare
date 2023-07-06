import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';


const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'add-product-category', component: AddProductCategoryComponent },



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
