import {Injectable} from '@angular/core';
import {
    PostAccessTokenRequest, PostAddressRequest, PostAvatarRequest, PostBirthRequest, PostNameRequest,
    PostSexRequest
} from "../../message/user.request";
import {GlobalConfigProvider} from "../global-config/global-config";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

/**
 * 用户相关接口
 */
@Injectable()
export class UserProvider {

    constructor(public http: Http,
                public globalConfig: GlobalConfigProvider) {
    }

    // 用户登录
    httpPost(request: PostAccessTokenRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.login, request)
            .pipe(map(res => res.json()));
    }

    // 获取用户信息
    httpGetUser(id: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.profile + '?id=' + id)
            .pipe(map(res => res.json()));
    }

    // 更新头像
    httpPostAvatar(request: PostAvatarRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(map(res => res.json()));
    }

    // 更新姓名
    httpPostName(request: PostNameRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(map(res => res.json()));
    }

    // 更新性别
    httpPostSex(request: PostSexRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(map(res => res.json()));
    }

    // 更新生日
    httpPostBirth(request: PostBirthRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(map(res => res.json()));
    }

    // 更新收货地址
    httpPostAddress(request: PostAddressRequest): Observable<any> {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(map(res => res.json()));
    }

    // 获取验证码
    httpGetVerifyCode(phone: string): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.verifyCode + '?phone=' + phone)
            .pipe(map(res => res.json()));
    }

    // 获取商家信息（管理员）
    httpGetAdminId(): Observable<any> {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'get_admin_id')
        .pipe(map(res => res.json()));
    }
}
