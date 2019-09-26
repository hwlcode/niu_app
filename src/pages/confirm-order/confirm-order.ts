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
import {UserAddressPage} from "../user-address/user-address";
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {Http} from "@angular/http";
import {map} from "rxjs/operators";

declare function unescape(s: string): string;

declare let cordova: any;

@IonicPage()
@Component({
    selector: 'page-confirm-order',
    templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
    orders: any;
    address: any = null;
    addressId: string;
    name;
    phone;
    userId;
    sum: any = 0;
    payway: number = 1;
    sn: string; // 订单编号： YK4235666
    no: string; // 订单_id
    subject: string = '';
    body: string = '';
    payInfo: string = '';

    adminId: string;
    adminPhone: string;

    hasPay: boolean = false;
    code: string = '';
    openId: string = '';

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
                public homeServiceProvider: HomeServiceProvider,
                public http: Http,
                public alertController: AlertController,
                public navParams: NavParams) {
        this.orders = navParams.get('orders');

        // 商品中途下架
        this.orders.map(item => {
            this.homeServiceProvider.getProductById(item.product._id)
                .subscribe(data => {
                    if (data.data.pro_status != 0) {
                        this.utilService.showToast(this.toastCtrl, data.data.name + '己下架或删除，请重新下单！');
                    }
                });
        });

        this.sn = navParams.get('sn');
        this.no = this.navParams.get('no');
    }

    ionViewDidEnter() {
        // 用户信息
        this.storage.get('user').then(user => {
            if (user != null) {
                this.userId = user._id;
                this.getDefaultAddress(user._id);
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
            p += (this.orders[i].num ? this.orders[i].num : 0) * this.orders[i].product.price;

            this.subject += this.orders[i].product.name + ' ';
            this.body += this.orders[i].product.name + 'x' + this.orders[i].num + ' ';
        }
        this.sum = p.toFixed(2);

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

        if (window.location.href.indexOf('code') != -1) {
            this.code = this.getQueryString('code');
            this.getOpenId(this.code);
        }
    }

    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        let q = window.location.pathname.substr(1).match(reg_rewrite);
        if (r != null) {
            return unescape(q[2]);
        } else if (q != null) {
            return unescape(q[2]);
        } else {
            return null;
        }
    }

    getDefaultAddress(userId) {
        this.userService.getDefaultUserAddress(userId).subscribe(
            res => {
                if (res.code == 0) {
                    if (res.data != null) {
                        this.address = res.data.address;
                        this.name = res.data.name;
                        this.phone = res.data.phone;
                        this.changeAddress(this.no, res.data._id);
                    }
                }
            }
        )
    }

    getOpenId(code) {
        this.http.get('/api/pay/wx_pay/getOpenId?code=' + code)
            .pipe(map(res => res.json()))
            .subscribe(
                res => {
                    this.openId = res.data.openid;
                    this.payOurMoney();
                }
            )
    }

    payOurMoney() {
        let self = this;
        let openid = this.openId;
        let params = {
            attach: self.subject, // 订单标题
            body: self.body, // 订单描述
            out_trade_no: self.sn, // 订单号
            // total_fee: self.sum, // 订单金额
            total_fee: 0.01, // 订单金额
        };

        this.http.get('/api/pay/wx_pay/order?openid=' + openid + '&attach=' + params.attach + '&body=' + params.body + '&total_fee=' + params.total_fee + '&out_trade_no=' + params.out_trade_no)
            .pipe(map(res => res.json()))
            .subscribe(
                async res => {
                    let data = res.data;
                    console.log(data);
                    const alert = await this.alertController.create({
                        title: '确认支付结果',
                        buttons: [
                            {
                                text: '支付遇到问题',
                                handler: () => {
                                    alert.dismiss();
                                }
                            },
                            {
                                text: '己完成支付',
                                handler: () => {
                                    this.orderQuery(alert);
                                }
                            }
                        ]
                    });
                    await alert.present();
                },
                err => {
                    this.utilService.showToast(this.toastCtrl, err);
                }
            )
    }

    orderQuery(alert) {
        let self = this;
        this.http.get('/api/pay/wx_pay/public/orderQuery?out_trade_no=' + this.sn)
            .pipe(map(res => res.json()))
            .subscribe(data => {
                console.log(data);
                if (data.data.code == 200) {
                    // 通知商家发货
                    let opts = {
                        content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                        from: self.userId,
                        to: self.adminId // 管理员ID
                    };
                    self.userOrderNotification(opts);
                    self.msgToBusiness(self.adminPhone, self.sn);

                    // 用户收到下单通知
                    let businessOpts = {
                        content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                        from: self.adminId, // 管理员ID
                        to: self.userId
                    };
                    self.userOrderNotification(businessOpts);

                    // 改变订单状态 status=1
                    self.changeOrderStatus(self.payway);
                    // 获取支付时间
                    self.changePayDate(self.sn);
                    // 禁用按钮
                    self.hasPay = true;
                } else {
                    this.utilService.showToast(this.toastCtrl, data.data.msg);
                }
                alert.dismiss();
            })
    }

    // 提交定单
    confirmPay() {
        let self = this;
        // 商品中途下架
        this.orders.map(item => {
            this.homeServiceProvider.getProductById(item.product._id)
                .subscribe(data => {
                    console.log(data.data.price != item.product.price, data.data.price, item.product.price);
                    if (data.data.pro_status != 0 || data.data.price != item.product.price) {
                        this.utilService.showToast(this.toastCtrl, data.data.name + '商品信息己变更，请重新下单！');
                    } else {
                        if (this.address == null) {
                            this.utilService.showToast(self.toastCtrl, '请选择收货地址！');
                        } else {
                            if (this.payway == 0) {
                                this.alipay();
                            } else if (this.payway == 1) {
                                let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                                let uaMatch: any = ua.match(/MicroMessenger/i);
                                if (uaMatch == "micromessenger") {
                                    // 公众号支付
                                    // 获取wx code： 公众号支付必须
                                    let wxappid = 'wxb80d00a17cb6631d';
                                    let return_uri = encodeURIComponent('http://wap.gxyingken.com/');
                                    let scope = 'snsapi_userinfo';
                                    let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
                                    let url = `${oauthUrl}?appid=${wxappid}&redirect_uri=${return_uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;

                                    window.location.href = url;
                                } else {
                                    this.appPay();
                                }
                            }
                        }
                    }
                });
        });
    }

    // 支付宝支付
    alipay() {
        let self = this;
        // 支付宝
        console.log(this.payInfo);
        cordova.plugins.alipay.payment(this.payInfo,
            function success(e) {
                console.log(e);
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
                    };
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
                console.log(e);
                self.utilService.showToast(self.toastCtrl, e.memo);
                self.navCtrl.push(OrdersPage);
                self.hasPay = true;
            });
    }

    // app 支付
    appPay() {
        let self = this;
        // 微信 app
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
                            };
                            self.userOrderNotification(opts);
                            self.msgToBusiness(self.adminPhone, self.sn);

                            // 用户收到下单通知
                            let businessOpts = {
                                content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                                from: self.adminId, // 管理员ID
                                to: self.userId
                            };
                            self.userOrderNotification(businessOpts);
                        });

                        // 改变订单状态 status=1
                        self.changeOrderStatus(self.payway);
                        // 获取支付时间
                        self.changePayDate(self.sn);
                        // 禁用按钮
                        self.hasPay = true;
                    },
                    err => {
                        self.utilService.showToast(this.toastCtrl, err);
                        console.log(err);
                    }
                )
            }
        });
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

    // 更改收货地址
    changeAddress(sn, addressId) {
        this.ordersService.httpChangeAddress(sn, addressId).subscribe(
            data => {
                if (data.code == 0) {
                    console.log(data.msg);
                }
            }
        )
    }

    // 更新完成支付时间
    changePayDate(sn) {
        this.ordersService.httpChangePayDate(sn).subscribe(
            data => {
                if (data.code == 0) {
                    console.log(data.msg);
                }
            }
        )
    }

    selectAddress() {
        this.navCtrl.push(UserAddressPage);
    }

}
