import {Component} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ConfirmOrderPage} from "../confirm-order/confirm-order";
import {OrdersProvider} from "../../providers/orders/orders";

@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    cart: Array<any> = [];
    products: any;
    errorMsg: any;
    sum: number = 0;
    userId: string;

    constructor(public navCtrl: NavController,
                public homeServiceProvider: HomeServiceProvider,
                public orderService: OrdersProvider,
                public events: Events,
                public storage: Storage) {

        this.storage.get('cart').then(
            cart => {
                // console.log(cart);
                if (cart != null) {
                    let p = 0;

                    for (let i = 0; i < cart.length; i++) {
                        p += ( cart[i].num ? cart[i].num : 0 ) * cart[i].product.price;
                    }
                    this.sum = p;

                    this.cart = cart;
                }
            }
        )

        this.events.subscribe('cart:add', cart => {
            this.cart = cart;

            let p = 0;
            for (let i = 0; i < cart.length; i++) {
                p += ( cart[i].num ? cart[i].num : 0 ) * cart[i].product.price;
            }
            this.sum = p;
        });
    }

    ionViewDidLoad() {
        this.storage.get('user').then(
            user => {
                if (user != null) {
                    this.userId = user._id;
                }
            }
        );

        this.getProductList('', 1)
            .subscribe(
                data => {
                    if (data.code == 0) {
                        this.products = data.data.splice(0, 4);
                    }
                },
                error => {
                    this.errorMsg = <any>error;
                    console.log(error);
                });
    }

    chooseProduct() {
        let p = 0;

        for (let i = 0; i < this.cart.length; i++) {
            p += ( this.cart[i].num ? this.cart[i].num : 0 ) * this.cart[i].product.price;
        }
        this.sum = p;
    }

    getProductList(keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page)
    }

    goToDetail(product) {
        this.navCtrl.push(ProductDetailPage, {id: product._id});
    }

    buyNow() {
        // 生成订单
        this.orderService.httpPostOrder({
            products: JSON.stringify(this.cart),
            sumPrice: this.sum,
            customer: this.userId
        }).subscribe(res => {
            if (res.code == 0) {
                this.navCtrl.push(ConfirmOrderPage, {
                    orders: this.cart,
                    sn: res.data.no,  // 订单号 YK23423424234
                    no: res.data.sn   // 订单编号
                });
            }
        });
    }

    clearCart() {
        this.storage.remove('cart');
        this.cart = [];
    }

}
