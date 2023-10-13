import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { NewProductPageComponent } from './new-product-page/new-product-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    NewProductPageComponent,
    ProductPageComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
