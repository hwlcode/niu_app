import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {CodeRequest, OrderRequest} from "../../message/order.request";
import {Http} from "@angular/http";
import {GlobalConfigProvider} from "../global-config/global-config";

/**
 * 订单相关服务
 */
@Injectable()
export class OrdersProvider {

    constructor(public http: Http,
                public globalConfig: GlobalConfigProvider) {
        // console.log('Hello OrdersProvider Provider');
    }

    httpPostOrder(request: OrderRequest): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.orderAdd + '?products=' + request.products + '&sumPrice=' + request.sumPrice + '&customer=' + request.customer)
            .pipe(map(res => res.json()));
    }

    httpGetOrderById(id: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.orderList + '?id=' + id)
            .pipe(map(res => res.json()));
    }

    httpUpdateOrderById(id: string, payWay: number): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.updateOrder + '/' + id + '/' + payWay)
            .pipe(map(res => res.json()));
    }

    httpPostCode(request: CodeRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + 'update_code', request)
            .pipe(map(res => res.json()));
    }

    httpDelOrder(id: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'order/del/' + id)
            .pipe(map(res => res.json()));
    }

}
