import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {UserProvider} from "../../providers/user/user";
import {Storage} from "@ionic/storage";
import {ValidatorsProvider} from "../../providers/validators/validators";

@IonicPage()
@Component({
    selector: 'page-address',
    templateUrl: 'address.html',
})
export class AddressPage {
    fromGroup: FormGroup;
    address: string;
    user: any;
    id: string = null;

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
            name: ['', Validators.required],
            phone: ['', [ValidatorsProvider.phone]],
            address: ['', Validators.required]
        });

        if(this.navParams.get('address')){
            this.id = this.navParams.get('address')._id;
            this.fromGroup.reset({
                name: this.navParams.get('address').name,
                phone: this.navParams.get('address').phone,
                address: this.navParams.get('address').address
            });
        }

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
            if(this.id != null){
                this.fromGroup.value.id = this.id;
            }
            this.fromGroup.value.userId = this.user._id;
            this.fromGroup.value.is_default = 0;
            this.userService.httpPostAddress(this.fromGroup.value).subscribe(data => {
                if (data.code === 0) {
                    this.viewCtrl.dismiss();
                    loading.dismiss();
                    this.utilService.showToast(this.toastCtrl, '更新成功。');
                }
            });
        }
    }

    remove(){
        this.userService.delUserAddress(this.id).subscribe(data => {
            if (data.code === 0) {
                this.viewCtrl.dismiss();
            }
        });
    }
}
