import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * 全局常量配置
 */
@Injectable()
export class GlobalConfigProvider {
    APP_SERVE_URL = 'http://192.168.1.102/api/';                    // 后台Api地址
    IS_DEBUG = false;                                              // 是否开发(调试)模式
    DEFAULT_AVATAR = './assets/imgs/avatar.png';                  // 用户默认头像
    PAGE_SIZE = 10;                                               // 默认分页大小
    IMAGE_SIZE = 1024;                                            // 拍照/从相册选择照片压缩大小
    QUALITY_SIZE = 94;                                            // 图像压缩质量，范围为0 - 100
    REQUEST_TIMEOUT = 20000;                                      // 请求超时时间,单位为毫秒
    API = {                                                       // 数据接口地址
        getBanner: 'web/banners',
        getProducts: 'productList',
        getProductById: 'app/product',
        verifyCode: 'verifyCode',
        profile: 'profile',
        login: 'user/login',
        upload: 'upload',
        uploadAvatar: 'upload/avatar',
        products: 'web/productList',
        saveProfile: 'saveProfile',
        search: 'products/list',  // 都用这个来取产品
        orderAdd: 'order/add',
        orderList: 'order/list',
        updateOrder: 'order/confirm_order',
        userNotificationList: 'notification',
        delUserNotification: 'notification/delete',
        readUserNotification: 'notification/read',
        unReadUserNotification: 'notification/unread'
    };

    constructor(public http: HttpClient) {
        // console.log('Hello GlobalConfigProvider Provider');
    }

}
