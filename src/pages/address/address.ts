import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {UserProvider} from "../../providers/user/user";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-address',
    templateUrl: 'address.html',
})
export class AddressPage {
    fromGroup: FormGroup;
    address: string;
    user: any;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public utilService: UtilServiceProvider,
                public loadingCtrl: LoadingController,
                public userService: UserProvider,
                public storage: Storage,
                public toastCtrl: ToastController,
                public viewCtrl: ViewController,
                public navParams: NavParams) {

        this.fromGroup = this.fb.group({
            address: ['', Validators.required]
        });

        this.address = this.navParams.get('user').address;

        this.storage.get('user').then(user => {
            if (user != null) {
                this.user = user;
            }
        });
    }

    ionViewDidLoad() {

    }

    update() {
        let loading = this.utilService.showLoading(this.loadingCtrl, '保存中...');
        if (this.fromGroup.valid) {
            this.fromGroup.value.id = this.user._id;
            this.userService.httpPostAddress(this.fromGroup.value).subscribe(data => {
                if (data.code === 0) {
                    this.viewCtrl.dismiss();
                    loading.dismiss();
                    this.utilService.showToast(this.toastCtrl, '更新成功。');
                }
            });
        }
    }

}
