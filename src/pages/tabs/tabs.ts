import {Component, ViewChild} from '@angular/core';

import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {NotificationPage} from "../notification/notification";
import {CartPage} from "../cart/cart";
import {LoginPage} from "../login/login";
import {Events, ModalController, Tabs} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {NotificationProvider} from "../../providers/notification/notification";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;
    isLogin = false;
    userId: string;

    tab1Root = HomePage;
    tab2Root = NotificationPage;
    tab3Root = CartPage;
    tab4Root = ContactPage;

    notificationNum: any;

    constructor(public modalCtrl: ModalController,
                public storage: Storage,
                public notificationService: NotificationProvider,
                public events: Events) {

        this.events.subscribe('user:login', (user, hasLogin) => {
            this.isLogin = hasLogin;
        });

        this.events.subscribe('notification:del', (num) => {
            this.notificationNum = num;
        });

        this.events.subscribe('notification:read', (num) => {
            this.notificationNum = num;
        });
    }

    ionViewDidEnter() {
        this.storage.get('user').then(
            val => {
                if (val !== null) {
                    this.isLogin = true;
                    this.userId = val._id;
                    this.getNotification();
                }
            }
        )
    }

    tabChange($event) {
        if ($event.index > 0) {
            this.checkLogin();
        }
    }

    checkLogin() {
        this.storage.get('user').then(
            val => {
                if (val !== null) {
                    this.isLogin = true;
                    this.userId = val._id;
                    this.getNotification();
                }else{
                    this.tabRef.select(0);
                    let loginModal = this.modalCtrl.create(LoginPage);
                    loginModal.present();
                }
            }
        )
    }

    getNotification() {
        this.notificationService.unReadUserNotification(this.userId)
            .subscribe(res => {
                if (res.code === 0) {
                    if (res.data.length > 0) {
                        this.notificationNum = res.data.length;
                    } else if (res.data.length == 0) {
                        this.notificationNum = '';
                    }
                }
            })
    }
}
