import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsByCategory } from './products-by-category';

@NgModule({
  declarations: [
    ProductsByCategory,
  ],
  imports: [
    IonicPageModule.forChild(ProductsByCategory),
  ],
})
export class ProductsByCategoryModule {}
