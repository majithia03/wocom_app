import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { CartPage } from '../cart/cart';


@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
 product: any;
 WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_1f8cc22facb29b58bfe930def023c65847535be2",
      consumerSecret: "cs_7a8e03354be58c804c74b1b099f7356332292174",
      version: 'wc/v2',
      wpAPI: true,
      wpAPIPrefix: 'wp-json'
    });
  }

  addToCart(product) {

    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } 
      
      else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {
            if (product.id == data[i].product.id) {
               let qty = data[i].qty;

              console.log("Product is already in the cart");

              data[i].qty = qty + 1;
              data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
              added = 1;
          }
         }

        if (added == 0) {
           data.push({
             "product": product,
             "qty": 1,
             "amount": parseFloat(product.price)
          })
        }

      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

      })

    })

  }
  openCart(){

   this.modalCtrl.create(CartPage).present();

  }

}
