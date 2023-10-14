import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './components/error404-page/error404-page.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    CustomHeaderComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    Error404PageComponent,
    CustomHeaderComponent
  ]
})
export class SharedModule { }
