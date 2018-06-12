import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategory } from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homepage; Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homepage = HomePage;
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_1f8cc22facb29b58bfe930def023c65847535be2",
      consumerSecret: "cs_7a8e03354be58c804c74b1b099f7356332292174",
      version: 'wc/v2',
      wpAPI: true,
      wpAPIPrefix: 'wp-json'
  });

  this.WooCommerce.getAsync("products/categories").then((data) => {
    console.log(JSON.parse(data.body));

    let temp: any[] = JSON.parse(data.body);

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].parent == 0) {
        
        if (temp[i].slug == "lehnga") {
          temp[i].icon = "bonfire";
        }
        if (temp[i].slug == "gowns") {
          temp[i].icon = "woman";
        }
        if (temp[i].slug == "bridal-collection") {
          temp[i].icon = "shirt";
        }
        
        this.categories.push(temp[i]);
      }
    }

  }, (err)=>{
    console.log(err);
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category) {
    
    this.childNavCtrl.setRoot(ProductsByCategory, { "category": category });

  }

}
