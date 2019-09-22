import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, ViewController} from 'ionic-angular';
import {HomeServiceProvider} from '../../providers/home-service/home-service';
import {UtilServiceProvider} from '../../providers/util-service/util-service';
import {ProductDetailPage} from '../product-detail/product-detail';

@IonicPage()
@Component({
    selector: 'page-product-list',
    templateUrl: 'product-list.html',
})
export class ProductListPage {
    keywords: string;
    products: any;
    last: boolean = false;
    infiniteScroll: any;
    errorMessage: any;
    page = 1;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public utilServiceProvider: UtilServiceProvider,
                public viewCtl: ViewController,
                public homeServiceProvider: HomeServiceProvider) {
    }

    ionViewDidLoad() {
        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProduct('', 1)
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

    dismiss() {
        this.viewCtl.dismiss();
    }

    search() {
        this.getProduct(this.keywords, 1)
            .subscribe(data => {
                if (data.code == 0) {
                    this.products = data.data;
                }
            }, error => {
                this.errorMessage = <any>error;
                console.log(error);
            });
    }

    getProduct(keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page);
    }

    goToDetail(product) {
        this.navCtrl.push(ProductDetailPage, {id: product._id});
    }

    doRefresh(refresher) {
        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.page = 1;
        this.getProduct('', this.page)
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
        this.page++;
        this.infiniteScroll = infiniteScroll;

        let loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProduct(this.keywords || '', this.page)
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
