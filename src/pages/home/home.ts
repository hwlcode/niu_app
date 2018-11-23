import {Component, OnInit} from '@angular/core';
import {Events, LoadingController, ModalController, NavController} from 'ionic-angular';
import {HomeServiceProvider} from '../../providers/home-service/home-service';
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {ProductListPage} from "../product-list/product-list";
import {ProductDetailPage} from "../product-detail/product-detail";
import {Storage} from '@ionic/storage';
import {GlobalConfigProvider} from "../../providers/global-config/global-config";
import {ContactPage} from "../contact/contact";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    slides = [
        'http://cdn.gxyingken.com/banner_1.jpg?imageView2/2/w/720/q/60',
        'http://cdn.gxyingken.com/banner_2.jpg?imageView2/2/w/720/q/60'
    ];
    products: any;
    last: boolean = false;
    infiniteScroll: any;
    errorMessage: any;
    avatar: string;
    isLogin: boolean = false;

    constructor(public navCtrl: NavController,
                public utilServiceProvider: UtilServiceProvider,
                public loadingCtrl: LoadingController,
                public storage: Storage,
                public globalConfig: GlobalConfigProvider,
                public modalCtrl: ModalController,
                public events: Events,
                public homeServiceProvider: HomeServiceProvider) {
        this.events.subscribe('user:login', (user, hasLogin) => {
            this.isLogin = hasLogin;
            this.avatar = (user.avatar == null ? this.globalConfig.DEFAULT_AVATAR : user.avatar.path);
        });
    }

    ionViewDidEnter() {
        this.events.subscribe('user:loginOut', (user, hasLogin) => {
            this.isLogin = hasLogin;
            this.avatar = this.globalConfig.DEFAULT_AVATAR;
        });

        this.storage.get('user').then(
            user => {
                if (user != null) {
                    this.isLogin = true;
                    this.avatar = (user.avatar == null ? this.globalConfig.DEFAULT_AVATAR : user.avatar.path);
                }
            }
        )
    }

    ngOnInit() {
        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', 1)
            .subscribe(
                data => {
                    loading.dismiss();
                    if (data.code == 0) {
                        this.products = data.data;
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(error);
                });
    }

    getProductList(keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page)
    }

    goToProductList($event) {
        this.navCtrl.push(ProductListPage);
    }

    goToDetail(product) {
        this.navCtrl.push(ProductDetailPage, {id: product._id});
    }

    login() {
        this.storage.get('user').then(
            user => {
                if (user != null) {
                    this.navCtrl.push(ContactPage);
                } else {
                    let loginModal = this.modalCtrl.create(LoginPage);
                    loginModal.present();
                }
            }
        )
    }

    goToProfile() {
        this.navCtrl.push(ContactPage);
    }

    doRefresh(refresher) {
        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', 1)
            .subscribe(
                data => {
                    if (data.code == 0) {
                        this.products = data.data;
                        if (this.infiniteScroll) {
                            this.infiniteScroll.enable(true);
                        }
                        refresher.complete();
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(error);
                });
    }

    doInfinite(infiniteScroll) {
        let page = 1;
        page++;
        this.infiniteScroll = infiniteScroll;

        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', page)
            .subscribe(data => {
                    if (data.code == 0) {
                        this.last = data.isLast;
                        this.products = this.products.concat(data.data);
                        this.products.concat(data.data);

                        infiniteScroll.complete();

                        if (this.last) {
                            infiniteScroll.enable(false);
                        }
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(error);
                });
    }
}
