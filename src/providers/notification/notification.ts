import {Injectable} from '@angular/core';
import {GlobalConfigProvider} from "../global-config/global-config";
import {Observable} from "rxjs/Observable";
import {NotificationRequest} from "../../message/notification.request";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

/**
 * 通知
 */
@Injectable()
export class NotificationProvider {
    constructor(public http: Http,
                public globalConfig: GlobalConfigProvider) {

    }

    getUserNotificationList(userId: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.userNotificationList + '?id=' + userId)
            .pipe(map(res => res.json()));
    }

    delUserNotification(id: string, userId: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.delUserNotification + '?id=' + id + '&userId=' + userId)
            .pipe(map(res => res.json()));
    }

    readUserNotification(id: string, userId: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.readUserNotification + '?id=' + id + '&userId=' + userId)
            .pipe(map(res => res.json()));
    }

    unReadUserNotification(id: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.unReadUserNotification + '?id=' + id)
            .pipe(map(res => res.json()));
    }

    createNotification(request: NotificationRequest): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'notification/create/' + request.content + '/' + request.from + '/' + request.to)
            .pipe(map(res => res.json()));
    }

    msgToBusiness(phone: string, no: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'msg_to_business?phone=' + phone + '&no=' + no)
            .pipe(map(res => res.json()));
    }
}
