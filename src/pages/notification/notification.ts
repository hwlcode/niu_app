import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {NotificationProvider} from "../../providers/notification/notification";

@IonicPage()
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {
    items: any;
    userId: string;
    showNotification: boolean = false;

    constructor(public navCtrl: NavController,
                public storage: Storage,
                public notificationProvider: NotificationProvider,
                public events: Events,
                public navParams: NavParams) {

    }

    ionViewDidLoad() {
        this.storage.get('user').then(val => {
            if (val != null) {
                this.userId = val._id;
                this.getNotification();
            }
        });
    }

    getNotification() {
        this.notificationProvider.getUserNotificationList(this.userId).subscribe(res => {
            if (res.code === 0) {
                this.items = res.data;
                if (res.data.length > 0) {
                    this.showNotification = true;
                }
            }
        });
    }

    removeItem(item) {
        this.notificationProvider.delUserNotification(item._id, this.userId)
            .subscribe(res => {
                if (res.code === 0) {
                    for (let i = 0; i < this.items.length; i++) {
                        if (this.items[i] == item) {
                            this.items.splice(i, 1);
                        }
                    }
                    this.events.publish('notification:del', res.data.unReadNum);
                }
            });
    }

    readItem(item) {
        if (item.read == 0) {
            this.notificationProvider.readUserNotification(item._id, this.userId)
                .subscribe(res => {
                    if (res.code === 0) {
                        item.read = 1;
                        this.events.publish('notification:read', res.data.unReadNum);
                    }
                });
        }
    }

    doRefresh(refresher) {
        this.notificationProvider.getUserNotificationList(this.userId).subscribe(res => {
            if (res.code === 0) {
                this.items = res.data;
                refresher.complete();
            }
        });
    }

}
