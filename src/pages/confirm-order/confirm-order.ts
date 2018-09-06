import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {PayProvider} from "../../providers/pay/pay";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {OrdersPage} from "../orders/orders";
import {WechatChenyu} from "wechat-chenyu";
import {OrdersProvider} from "../../providers/orders/orders";
import {NotificationProvider} from "../../providers/notification/notification";

declare let cordova: any;

@IonicPage()
@Component({
    selector: 'page-confirm-order',
    templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
    orders;
    address;
    name;
    phone;
    userId;
    sum: number = 0;
    payway: number = 1;
    sn: string; // 订单编号： YK4235666
    no: string; // 订单_id
    subject: string = '';
    body: string = '';
    payInfo: string = '';

    adminId: string;
    adminPhone: string;

    hasPay: boolean = false;

    constructor(public navCtrl: NavController,
                public storage: Storage,
                public userService: UserProvider,
                public payProvider: PayProvider,
                public utilService: UtilServiceProvider,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public wechatChenyu: WechatChenyu,
                public ordersService: OrdersProvider,
                public notificationService: NotificationProvider,
                public navParams: NavParams) {
        this.orders = navParams.get('orders');
        this.sn = navParams.get('sn');
        this.no = this.navParams.get('no');
    }

    ionViewDidLoad() {
        // 用户信息
        this.storage.get('user').then(user => {
            if (user != null) {
                this.userId = user._id;

                this.userService.httpGetUser(user._id).subscribe(
                    data => {
                        if (data.code == 0) {
                            let userInfo = data.data;
                            this.address = userInfo.address;
                            this.name = userInfo.name;
                            this.phone = userInfo.phone;
                        }
                    }
                )
            }
        });

        // 商家信息
        this.userService.httpGetAdminId().subscribe(
            res => {
                if (res.code == 0) {
                    this.adminId = res.data._id;
                    this.adminPhone = res.data.phone;
                }
            }
        );

        // 计算总价
        let p = 0;
        for (let i = 0; i < this.orders.length; i++) {
            p += ( this.orders[i].num ? this.orders[i].num : 0 ) * this.orders[i].product.price;

            this.subject += this.orders[i].product.name + ' ';
            this.body += this.orders[i].product.name + 'x' + this.orders[i].num + ' ';
        }
        this.sum = p;

        // 获取支付宝签名字符串
        this.payProvider.postPayInfo({
            subject: this.subject,   // 标题
            body: this.body,         // 描述 （子标题）
            outTradeId: this.sn,     // app生成的订单号
            amount: this.sum + ''    // 订单总价
        }).subscribe(res => {
            if (res) {
                this.payInfo = res.data.msg;
            }
        });
    }

    confirmPay() {
        var self = this;
        if (this.payway == 0) {
            // 支付宝
            console.log(this.payInfo);
            cordova.plugins.alipay.payment(this.payInfo,
                function success(e) {
                    //e.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息
                    //e.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success
                    //e.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error
                    //当e.resultStatus为9000时，请去服务端验证支付结果
                    /**
                     * 同步返回的结果必须放置到服务端进行验证（验证的规则请看https://doc.open.alipay.com/doc2/
                     * detail.htm?spm=0.0.0.0.xdvAU6&treeId=59&articleId=103665&
                     * docType=1) 建议商户依赖异步通知
                     */
                    if (e.resultStatus == 9000) {
                        // let res = JSON.parse(e.result);
                        // self.tradeId = res.alipay_trade_app_pay_response.trade_no;
                        // //验证订单
                        // self.payProvider.queryOrder(self.sn, self.tradeId).subscribe(res => {
                        //     self.utilService.alert(res.data.ok);
                        //     if (res.data.ok) {
                        //
                        //     }
                        // });

                        // 通知商家发货
                        let opts = {
                            content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                            from: self.userId,
                            to: self.adminId // 管理员ID
                        }
                        self.userOrderNotification(opts);
                        self.msgToBusiness(self.adminPhone, self.sn);

                        // 用户收到下单通知
                        let businessOpts = {
                            content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                            from: self.adminId, // 管理员ID
                            to: self.userId
                        }
                        self.userOrderNotification(businessOpts);

                        // 改变订单状态 status=1
                        self.changeOrderStatus(self.payway);
                        // 禁用按钮
                        self.hasPay = true;
                    }
                }, function error(e) {
                    self.utilService.showToast(self.toastCtrl, e.memo);
                    console.log(e);
                    self.navCtrl.push(OrdersPage);
                    self.hasPay = true;
                });
        } else if (this.payway == 1) {
            // 微信
            let params = {
                attach: self.subject, // 订单标题
                body: self.body, // 订单描述
                out_trade_no: self.sn, // 订单号
                total_fee: self.sum, // 订单金额
            };

            this.payProvider.postWxPay(params).subscribe(res => {
                if (res.code == 0) {
                    this.wechatChenyu.sendPaymentRequest(res.data).then(
                        data => {
                            // 成功之后的跳转
                            self.utilService.alert(this.alertCtrl, '支付成功', () => {
                                // 通知商家发货
                                let opts = {
                                    content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                                    from: self.userId,
                                    to: self.adminId // 管理员ID
                                }
                                self.userOrderNotification(opts);
                                self.msgToBusiness(self.adminPhone, self.sn);

                                // 用户收到下单通知
                                let businessOpts = {
                                    content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                                    from: self.adminId, // 管理员ID
                                    to: self.userId
                                }
                                self.userOrderNotification(businessOpts);

                                // 改变订单状态 status=1
                                self.changeOrderStatus(self.payway);
                                // 禁用按钮
                                self.hasPay = true;
                            });
                        },
                        err => {
                            self.utilService.showToast(this.toastCtrl, err);
                            console.log(err);
                        }
                    )
                }
            });
        }
    }

    // 改变订单状态
    changeOrderStatus(payWay) {
        this.ordersService.httpUpdateOrderById(this.no, payWay).subscribe(
            res => {
                if (res.code == 0) {
                    this.navCtrl.push(OrdersPage);
                }
            }
        )
    }

    // 给用户发送通知
    userOrderNotification(opts) {
        this.notificationService.createNotification(opts).subscribe(
            res => {
                if (res.code == 0) {
                    console.log('success');
                }
            }
        )
    }

    // 短信通知商家发货
    msgToBusiness(phone, sn) {
        this.notificationService.msgToBusiness(phone, sn).subscribe(
            data => {
                if (data.code == 0) {
                    console.log('success');
                }
            }
        )
    }

}
