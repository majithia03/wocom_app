import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import * as WC from 'woocommerce-api';


@IonicPage()
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
   
    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_1f8cc22facb29b58bfe930def023c65847535be2",
      consumerSecret: "cs_7a8e03354be58c804c74b1b099f7356332292174",
      version: 'wc/v2',
      wpAPI: true,
      wpAPIPrefix: 'wp-json'
    });

    this.WooCommerce.getAsync("products/?category=" + this.category.id ).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory')
  }
  

  loadMoreProducts(event){
     this.page++;
     console.log("Getting page " + this.page);
     this.WooCommerce.getAsync("products/?category=" + this.category.id + "&page=" + this.page).then((data) => {
       let temp = (JSON.parse(data.body));
       this.products = this.products.concat((JSON.parse(data.body)));
       console.log(this.products);
      event.complete();

       if(temp.length < 10){
     event.enable(false);

    this.toastCtrl.create({
      message: "No more products!",
      duration: 5000
    }).present();
}
     }, (err) => {
    console.log(err);
    })

  }
  
  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product} );
  }
}
  
