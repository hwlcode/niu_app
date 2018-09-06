import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {GlobalConfigProvider} from "../global-config/global-config";
import {payInfoRequest, payWxPayInfoRequest} from "../../message/pay.request";
import {map} from "rxjs/operators";

/**
 * 支付相关服务
 */
@Injectable()
export class PayProvider {

    constructor(public http: Http,
                public globalConfig: GlobalConfigProvider) {
        // console.log('Hello PayProvider Provider');
    }

    postPayInfo(request: payInfoRequest): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'pay_info?subject=' + request.subject + '&body=' + request.body + '&amount=' + request.amount + '&outTradeId=' + request.outTradeId)
            .pipe(map(res => res.json()));
    }

    queryOrder(sn: string, tradeId: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'query_order?sn=' + sn + '&trade_id=' + tradeId)
            .pipe(map(res => res.json()));
    }

    postWxPay(request: payWxPayInfoRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + 'wx_pay/order', request)
            .pipe(map(res => res.json()));
    }

}
