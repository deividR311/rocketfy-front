import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { NewProductPageComponent } from './new-product-page/new-product-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new', component: NewProductPageComponent },
      { path: 'edit/:id', component: NewProductPageComponent },
      { path: 'list', component: ProductsPageComponent },
      { path: ':id', component: ProductPageComponent },
      { path: '**', component: ProductsPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
