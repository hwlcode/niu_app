import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {ValidatorsProvider} from "../../providers/validators/validators";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loginForm: FormGroup;
    showMessage: any;
    // 验证码倒计时
    verifyCode: any = {
        verifyCodeTips: "获取验证码",
        countdown: 30,
        disable: true
    };

    constructor(public viewCtrl: ViewController,
                public utilService: UtilServiceProvider,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public userService: UserProvider,
                public storage: Storage,
                public events: Events,
                public fb: FormBuilder,) {
        this.loginForm = fb.group({
            phone: ['', [ValidatorsProvider.phone]],
            phoneCode: ['', [ValidatorsProvider.minNumber]]
        });
    }

    ionViewDidLoad() {

    }

    /**
     * 关闭当前页面
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }


    login() {
        let loading = this.utilService.showLoading(this.loadingCtrl);

        if (this.loginForm.valid) {
            this.userService.httpPost(this.loginForm.value)
                .subscribe(
                    data => {
                        if (data.code == 0) {
                            // 本地存储
                            this.storage.set('user', data.data);
                            // 消息通知
                            this.events.publish('user:login', data.data, true);

                            this.utilService.showToast(this.toastCtrl, '登录成功');
                        } else {
                            this.utilService.showToast(this.toastCtrl, data.msg);
                        }
                        loading.dismiss();
                        this.dismiss();
                    },
                    error => this.showMessage = <any>error
                );
        }
    }

    // 倒计时
    settime() {
        if (this.verifyCode.countdown == 1) {
            this.verifyCode.countdown = 60;
            this.verifyCode.verifyCodeTips = "获取验证码";
            this.verifyCode.disable = true;
            return;
        } else {
            this.verifyCode.countdown--;
        }

        this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
            this.settime();
        }, 1000);
    }

    getCode() {
        if (this.loginForm.value.phone == '') {
            this.utilService.showToast(this.toastCtrl,'请输入手机号码');
            return;
        }

        //发送验证码成功后开始倒计时
        if (this.verifyCode.disable) {
            this.userService.httpGetVerifyCode(this.loginForm.value.phone).subscribe(data => {
                if (data.code == 'OK') {
                    console.log(data);
                } else {
                    this.utilService.showToast(this.toastCtrl, data.msg);
                }
            });
        }
        this.verifyCode.disable = false;
        this.settime();
    }

}
