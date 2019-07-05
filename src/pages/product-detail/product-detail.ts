import {Component, OnInit} from '@angular/core';
import {
    Events, IonicPage, LoadingController, ModalController, NavController, NavParams, Tabs, ToastController,
    ViewController
} from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {LoginPage} from "../login/login";
import {Storage} from '@ionic/storage';
import {ConfirmOrderPage} from "../confirm-order/confirm-order";
import {OrdersProvider} from "../../providers/orders/orders";

@IonicPage()
@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit {
    title: string; // 标题
    id: string;  // id
    banner: string; // 图片
    price: string; // 价格
    unit: string; // 单位
    desc: string; // 详情
    code: number; // 积分
    errorMsg: any; // 日志
    products: any; // 猜你喜欢
    proNum: 0; // 产品数量
    product: any; // 当前产品
    userId: string; // 当前用户Id
    sum: number; // 订单总价
    origin_price: string;
    origin_price_unit: string;

    isLogin = false;

    constructor(public navCtrl: NavController,
                public homeServiceProvider: HomeServiceProvider,
                public loadingCtrl: LoadingController,
                public utilService: UtilServiceProvider,
                public toastCtl: ToastController,
                public modalCtrl: ModalController,
                public viewCtrl: ViewController,
                public events: Events,
                public storage: Storage,
                public orderService: OrdersProvider,
                public navParams: NavParams) {
        this.id = this.navParams.get('id');
        // 订阅模式：不适合在页面间通知，只适合在同一个页面，因为这里还有buynow,所以需要订阅一上
        events.subscribe('user:login', (user, hasLogin) => {
            this.isLogin = hasLogin;
        });
        // 本地存储的方式：适用于不同的页面间通知,接受tab那边登录过，这里需要去本地存储当中取出登录状态
        this.storage.get('user').then(
            val => {
                if (val !== null) {
                    this.isLogin = true;
                    this.userId = val._id;
                }
            }
        )
    }

    ngOnInit() {
        let loading = this.utilService.showLoading(this.loadingCtrl);
        this.getProductById(this.id)
            .subscribe(
                data => {
                    if (data.code === 0) {
                        this.title = data.data.name;
                        this.banner = data.data.banner.path;
                        this.price = data.data.price;
                        this.unit = data.data.unit;
                        this.origin_price = data.data.origin_price;
                        this.origin_price_unit = data.data.origin_price_unit;
                        this.desc = data.data.desc;
                        this.code = data.data.code;

                        this.product = data.data;
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMsg = <any>error;
                    console.log(error);
                }
            )

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

    getProductById(id) {
        return this.homeServiceProvider.getProductById(id)
    }

    getProductList(keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page)
    }

    goToDetail(product) {
        this.navCtrl.push(ProductDetailPage, {id: product._id});
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    addToCart(product) {
        this.checkLogin();

        if (this.proNum) {
            let orders: Array<any> = [];
            let order: Object = {};

            (order as any).product = product;
            (order as any).num = this.proNum;
            orders.push(order);

            this.storage.get('cart').then(
                cart => {
                    if (cart == null) {
                        // 购物车为空
                        this.storage.set('cart', orders);
                        this.events.publish('cart:add', orders);
                        this.utilService.showToast(this.toastCtl, '商品己经成功添加到购物车');
                    } else {
                        // 购物车不为空
                        orders = cart;
                        let isExist = JSON.stringify(cart).indexOf(product._id) != -1;

                        if (!isExist) {
                            // 商品在购物车不存在
                            orders.push(order);
                            this.storage.set('cart', orders);
                            this.events.publish('cart:add', orders);
                            this.utilService.showToast(this.toastCtl, '商品己经成功添加到购物车');
                        } else {
                            this.utilService.showToast(this.toastCtl, '购物车中己经存在该商品，无需重复添加');
                        }
                    }
                }
            );
        }
    }

    buyNow(product) {
        this.checkLogin();

        if (this.proNum) {
            let orders: Array<any> = [];
            let order: Object = {};

            (order as any).product = product;
            (order as any).num = this.proNum;
            orders.push(order);

            this.sum = product.price * this.proNum;

            // 生成订单
            this.orderService.httpPostOrder({
                products: JSON.stringify(orders),
                sumPrice: this.sum,
                customer: this.userId
            }).subscribe(res => {
                if (res.code == 0) {
                    this.navCtrl.push(ConfirmOrderPage, {
                        orders: orders,
                        sn: res.data.no,  // 订单号 YK23423424234
                        no: res.data.sn   // 订单编号
                    });
                }
            });
        }
    }

    checkLogin() {
        if (this.proNum == undefined || this.proNum == 0) {
            this.utilService.showToast(this.toastCtl, '请添加购买的数量');
            return false;
        }

        if (!this.isLogin) {
            let loginModal = this.modalCtrl.create(LoginPage);
            loginModal.present();
            return;
        }
    }

    chooseProduct() {

    }

    goToCart() {
        //选中首页
        let tab: Tabs = this.navCtrl.parent;
        this.navCtrl.popToRoot();
        tab.select(2);
    }

}
