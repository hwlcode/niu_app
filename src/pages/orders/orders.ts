import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {OrdersProvider} from "../../providers/orders/orders";
import {ConfirmOrderPage} from "../confirm-order/confirm-order";
import {UtilServiceProvider} from "../../providers/util-service/util-service";

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})
export class OrdersPage implements OnInit {
    userId: string;
    orders: Array<any> = [];

    constructor(public navCtrl: NavController,
                private storage: Storage,
                public ordersService: OrdersProvider,
                public utilService: UtilServiceProvider,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public orderService: OrdersProvider,
                public navParams: NavParams) {

        this.storage.get('user').then(val => {
            if (val != null) {
                this.userId = val._id;
                this.getOrderList();
            }
        });

    }

    ngOnInit() {

    }

    getOrderList() {
        this.ordersService.httpGetOrderById(this.userId).subscribe(res => {
            if (res.code == 0) {
                this.orders = res.orders;
                this.orders.map(order => {
                    order.products = JSON.parse(order.products);
                    // let arr = [];
                    // order.products.map(product => {
                    //     product.product.orderNum = product.num;
                    //     arr.push(product.product);
                    // });
                    // order.products = arr;

                    if (order.status == 0) {
                        if (order.type == 1) {
                            order.orderStatusText = '己付款，待发货';
                        } else {
                            order.orderStatusText = '待支付';
                        }
                    }
                    else if (order.status == 1) {
                        order.orderStatusText = '己付款，待发货';
                    }
                    else if (order.status == 2) {
                        order.orderStatusText = '己发货';
                    }
                });
            }
        });
    }

    delOrder(id) {
        this.utilService.alert(this.alertCtrl, '确认删除该订单？', (data) => {
            this.orderService.httpDelOrder(id).subscribe(res => {
                if (res.code == 0) {
                    this.getOrderList();
                    // this.cd.detectChanges(); // 数据更新后，刷新页面
                }else{
                    this.getOrderList();
                    this.utilService.showToast(this.toastCtrl, res.msg);
                }
            })
        })
    }

    goToPay(order) {
        this.navCtrl.push(ConfirmOrderPage, {
            orders: order.products,
            sn: order.sn,
            no: order._id
        });
    }

}
