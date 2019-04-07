import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AddressPage} from "../address/address";
import {Storage} from "@ionic/storage";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the UserAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-address',
    templateUrl: 'user-address.html',
})
export class UserAddressPage implements OnInit {
    user: any;
    address: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public utilService: UtilServiceProvider,
                public toastCtrl: ToastController,
                public userService: UserProvider,
                public viewCtrl: ViewController,
                public storage: Storage,) {
        this.storage.get('user').then(user => {
            if (user != null) {
                this.user = user;
            }
        });
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.getAdderss();
    }

    addAddress() {
        this.navCtrl.push(AddressPage, {user: this.user});
    }

    getAdderss() {
        let loading = this.utilService.showLoading(this.loadingCtrl, '保存中...');

        this.userService.getHttpUserAddress(this.user._id).subscribe(data => {
            if (data.code === 0) {
                loading.dismiss();
                this.address = data.data;
            }
        });
    }

    changeDefault(val) {
        this.userService.changeUserDefaultAddress(this.user._id, val).subscribe(data => {
            if (data.code === 0) {
                this.utilService.showToast(this.toastCtrl, '您己更改收货地址！');
                this.address = data.data;
                this.viewCtrl.dismiss();
            }
        });
    }

    changeAddress(id) {
        let that  = null;
        this.address.map(adr => {
            if(adr._id == id){
                that = adr;
            }
        });

        this.navCtrl.push(AddressPage, {address: that});
    }

}
