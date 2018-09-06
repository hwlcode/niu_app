import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigProvider} from "../global-config/global-config";
import {Http} from "@angular/http";
import {map} from "rxjs/operators";

/**
 * 首页请求服务
 */
@Injectable()
export class HomeServiceProvider {
    constructor(public http: Http,
                public globalConfig: GlobalConfigProvider) {

    }

    getProductList(keywords: string, page: number): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.search + '?keywords=' + keywords + '&page=' + page)
            .pipe(map(res => res.json()));
    }

    getProductById(id: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.getProductById + '/' + id)
            .pipe(map(res => res.json()));
    }
}
