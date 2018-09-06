import {Component, OnInit} from '@angular/core';
import {Events, LoadingController, NavController, Tabs, ToastController} from 'ionic-angular';
import {GlobalConfigProvider} from "../../providers/global-config/global-config";
import {Storage} from '@ionic/storage';
import {OrdersPage} from "../orders/orders";
import {NamePage} from "../name/name";
import {UserProvider} from "../../providers/user/user";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {AddressPage} from "../address/address";
import {AboutPage} from "../about/about";
import {VersionPage} from "../version/version";
import {NativeProvider} from "../../providers/native/native";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
    title: string = '我的';
    headFace: string;
    code: number = 0;
    name: string;
    phone: string;
    selectOptions: object;
    event = {
        timeStarts: '1985-80-10'
    };
    gender: string = "先生";
    user: any;

    constructor(public navCtrl: NavController,
                public storage: Storage,
                public userService: UserProvider,
                public utileService: UtilServiceProvider,
                public loadCtrl: LoadingController,
                public toastCtrl: ToastController,
                public nativeService: NativeProvider,
                public events: Events,
                public globalConfig: GlobalConfigProvider) {

        this.headFace = this.globalConfig.DEFAULT_AVATAR;
    }

    ngOnInit() {
        this.initImgSer();
        this.selectOptions = {
            title: '选择性别'
        }
    }

    ionViewDidEnter() {
        this.storage.get('user').then(
            user => {
                if (user != null) {
                    this.user = user;
                    this.loadUserInfo();
                }
            });
    }

    loadUserInfo() {
        this.userService.httpGetUser(this.user._id)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let user = res.data;
                        this.user = res.data;
                        this.headFace = (user.avatar == null ? this.headFace : user.avatar.path);
                        this.code = user.code;
                        this.name = user.name;
                        this.phone = user.phone;
                    }
                }
            )
    }

    //选择上传方式
    choosePic() {
        this.nativeService.showPicActionSheet();
    }

    // 初始化上传图片的服务
    private initImgSer() {
        this.nativeService.upload.fileKey = 'file';
        this.nativeService.upload.url = this.globalConfig.APP_SERVE_URL + this.globalConfig.API.upload; // 上传图片的url，如果同默认配置的url一致，那无须再设置

        this.nativeService.upload.success = (data) => {
            this.storage.get('user').then(user => {
                if (user != null) {
                    this.userService.httpPostAvatar({
                        id: user._id,
                        avatar: data.id
                    }).subscribe(data => {
                        if (data.code == 0) {
                            // this.cd.detectChanges();
                            console.log('头像更新成功');
                            //上传成功后的回调处理
                            this.loadUserInfo();
                            // this.navCtrl.setRoot(ProfilePage);
                        }
                    })
                }
            })
        };

        this.nativeService.upload.error = (err) => {
            this.utileService.showToast(this.toastCtrl, '错误：头像上传失败！');
        };
    }

    goToOrders() {
        this.navCtrl.push(OrdersPage);
    }

    changeUserName() {
        this.navCtrl.push(NamePage, {name: this.user.name});
    }

    saveSex(val: string) {
        let loading = this.utileService.showLoading(this.loadCtrl, '保存中...');
        this.userService.httpPostSex({
            id: this.user._id,
            sex: val
        }).subscribe(data => {
            if (data.code == 0) {
                this.gender = data.data.sex;
                loading.dismiss();
                this.utileService.showToast(this.toastCtrl, '更新成功。');
            }
        });
    }

    saveBirty(val: string) {
        let loading = this.utileService.showLoading(this.loadCtrl, '保存中...');
        this.userService.httpPostBirth({
            id: this.user._id,
            birth: val
        }).subscribe(data => {
            if (data.code == 0) {
                loading.dismiss();
                this.utileService.showToast(this.toastCtrl, '更新成功。');
            }
        });
    }

    goToAddress() {
        this.navCtrl.push(AddressPage, {user: this.user});
    }

    goToVersion() {
        this.navCtrl.push(VersionPage);
    }

    goToAbout() {
        this.navCtrl.push(AboutPage);
    }

    loginOut() {
        this.storage.remove('user');
        //选中首页
        let tab: Tabs = this.navCtrl.parent;
        tab.select(0);
        //给首页发送登出的通知事件
        this.events.publish('user:loginOut', null, false);
    }
}
