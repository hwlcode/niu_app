import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilServiceProvider} from "../../providers/util-service/util-service";
import {UserProvider} from "../../providers/user/user";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-name',
    templateUrl: 'name.html',
})
export class NamePage {
    fromGroup: FormGroup;
    name: string = '';
    user;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public utilService: UtilServiceProvider,
                public loadingCtrl: LoadingController,
                public userService: UserProvider,
                public storage: Storage,
                public toastCtrl: ToastController,
                public viewCtrl: ViewController,
                public navParams: NavParams) {
        this.name = this.navParams.get('name');

        this.fromGroup = this.fb.group({
            name: ['', Validators.required]
        });

        this.storage.get('user').then(user => {
            if (user != null) {
                this.user = user;
            }
        });
    }

    ionViewDidLoad() {
    }

    update() {
        if (this.fromGroup.valid) {
            this.fromGroup.value.id = this.user._id;
            let loading = this.utilService.showLoading(this.loadingCtrl, '保存中...');
            this.userService.httpPostName(this.fromGroup.value).subscribe(data => {
                if (data.code === 0) {
                    loading.dismiss();
                    this.utilService.showToast(this.toastCtrl, '更改成功。');
                    this.viewCtrl.dismiss();
                }
            });
        }
    }

}
