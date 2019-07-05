import {Component} from '@angular/core';
import {Events, IonicPage, NavController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ConfirmOrderPage} from "../confirm-order/confirm-order";
import {OrdersProvider} from "../../providers/orders/orders";
import {UtilServiceProvider} from "../../providers/util-service/util-service";

@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    cart: Array<any> = [];
    products: any;
    errorMsg: any;
    sum: any = 0;
    userId: string;

    constructor(public navCtrl: NavController,
                public homeServiceProvider: HomeServiceProvider,
                public orderService: OrdersProvider,
                public utilService: UtilServiceProvider,
                public toastCtrl: ToastController,
                public events: Events,
                public storage: Storage) {

        this.storage.get('cart').then(
            cart => {
                // console.log(cart);
                if (cart != null) {
                    let p: number = 0;

                    for (let i = 0; i < cart.length; i++) {
                        p += ( cart[i].num ? cart[i].num : 0 ) * cart[i].product.price;
                    }
                    this.sum = p.toFixed(2);

                    this.cart = cart;
                }
            }
        )

        this.events.subscribe('cart:add', cart => {
            this.cart = cart;

            let p:number = 0;
            for (let i = 0; i < cart.length; i++) {
                p += ( cart[i].num ? cart[i].num : 0 ) * cart[i].product.price;
            }
            this.sum = p.toFixed(2);
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
        this.sum = p.toFixed(2);
    }

    getProductList(keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page)
    }

    goToDetail(product) {
        this.navCtrl.push(ProductDetailPage, {id: product._id});
    }

    buyNow() {
        if(this.sum == 0){
            this.utilService.showToast(this.toastCtrl, '您没有需要支付的产品');
        }else {
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
    }

    clearCart() {
        this.storage.remove('cart');
        this.sum = 0;
        this.cart = [];
    }

}
