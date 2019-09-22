webpackJsonp([12],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * 验证
 */
var ValidatorsProvider = /** @class */ (function () {
    function ValidatorsProvider() {
    }
    /*E-mail*/
    // static email = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('email', control, '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
    // }
    /*手机号码*/
    ValidatorsProvider.phone = function (control) {
        var val = (control.value || '') + '';
        var reg = /^1[34578]\d{9}$/;
        var valid = reg.test(val);
        return valid ? null : { phoneValidator: true };
    };
    /*中文*/
    // static chinese = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
    // }
    /*英文、数字包括下划线*/
    // static legallyNamed = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
    // }
    /*5~6位短信验证码*/
    ValidatorsProvider.minNumber = function (control) {
        var val = (control.value || '') + '';
        var reg = /^\d{5,6}$/;
        var valid = reg.test(val);
        return valid ? null : { numberValidator: true };
    };
    ValidatorsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ValidatorsProvider);
    return ValidatorsProvider;
}());

//# sourceMappingURL=validators.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NativeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * native相关, 注插件需在platform.ready()中执行，参考app.component.ts
 */
var NativeProvider = /** @class */ (function () {
    function NativeProvider(utilService, toastCtrl, actionSheetCtrl, camera, imagePicker, transfer, appVersion) {
        this.utilService = utilService;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.transfer = transfer;
        this.appVersion = appVersion;
        // 调用相机时传入的参数
        this.cameraOpt = {
            quality: 50,
            destinationType: 1,
            sourceType: 1,
            encodingType: 0,
            mediaType: 0,
            allowEdit: true,
            correctOrientation: true
        };
        // 调用相册时传入的参数
        this.imagePickerOpt = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };
        this.upload = {
            url: '',
            fileKey: 'file',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' //不加入 发生错误！！
            },
            params: {},
            success: function (data) {
            },
            error: function (err) {
            },
            listen: function () {
            } //监听上传过程
        };
        this.fileTransfer = this.transfer.create();
    }
    /**
     * 获取版本号
     * https://ionicframework.com/docs/native/app-version/
     */
    NativeProvider.prototype.getVersionNumber = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.appVersion.getVersionNumber().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                console.log(err, '获得app版本号失败');
                observer.error(false);
            });
        });
    };
    NativeProvider.prototype.showPicActionSheet = function () {
        this.useASComponent();
    };
    // 使用ionic中的ActionSheet组件
    NativeProvider.prototype.useASComponent = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '选择头像',
            buttons: [
                {
                    text: '拍照',
                    handler: function () {
                        _this.startCamera();
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: function () {
                        _this.openImgPicker();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // 启动拍照功能
    NativeProvider.prototype.startCamera = function () {
        var _this = this;
        this.camera.getPicture(this.cameraOpt).then(function (imageData) {
            _this.uploadImg(imageData);
        }, function (err) {
            _this.utilService.showToast(_this.toastCtrl, '无法使用拍照功能'); //错误：无法使用拍照功能！
        });
    };
    // 打开手机相册
    NativeProvider.prototype.openImgPicker = function () {
        var _this = this;
        var temp = '';
        this.imagePicker.getPictures(this.imagePickerOpt)
            .then(function (results) {
            for (var i = 0; i < results.length; i++) {
                temp = results[i];
            }
            _this.uploadImg(temp);
        }, function (err) {
            _this.utilService.showToast(_this.toastCtrl, '无法从手机相册中选择图片'); //错误：无法从手机相册中选择图片！
        });
        /*let str = '{"status":1,"msg":"提示：图片上传成功！","data":"http:\/\/192.168.1.20\/image\/580af6bcc4d40580af6bcc4d45.jpg"}';
        let res = JSON.parse(str);
        this.upload.success(res);*/
    };
    // 上传图片
    NativeProvider.prototype.uploadImg = function (path) {
        var _this = this;
        if (!path) {
            return;
        }
        var options = {
            fileKey: this.upload.fileKey,
            headers: this.upload.headers,
            params: this.upload.params
        };
        this.fileTransfer.upload(path, this.upload.url, options)
            .then(function (data) {
            if (_this.upload.success) {
                _this.upload.success(JSON.parse(data.response));
            }
        }, function (err) {
            if (_this.upload.error) {
                _this.upload.error(err);
            }
            else {
                _this.utilService.showToast(_this.toastCtrl, '错误：上传失败！');
            }
        });
    };
    // 停止上传
    NativeProvider.prototype.stopUpload = function () {
        if (this.fileTransfer) {
            this.fileTransfer.abort();
        }
    };
    NativeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */]])
    ], NativeProvider);
    return NativeProvider;
}());

//# sourceMappingURL=native.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__orders_orders__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__name_name__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__about_about__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__version_version__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_native_native__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_address_user_address__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, storage, userService, utileService, loadCtrl, toastCtrl, nativeService, events, globalConfig) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.userService = userService;
        this.utileService = utileService;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.nativeService = nativeService;
        this.events = events;
        this.globalConfig = globalConfig;
        this.title = '我的';
        this.code = 0;
        this.event = {
            timeStarts: '1985-80-10'
        };
        this.gender = "先生";
        this.headFace = this.globalConfig.DEFAULT_AVATAR;
    }
    ContactPage.prototype.ngOnInit = function () {
        this.initImgSer();
        this.selectOptions = {
            title: '选择性别'
        };
    };
    ContactPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.user = user;
                _this.loadUserInfo();
            }
        });
    };
    ContactPage.prototype.loadUserInfo = function () {
        var _this = this;
        this.userService.httpGetUser(this.user._id)
            .subscribe(function (res) {
            if (res.code === 0) {
                var user = res.data;
                _this.user = res.data;
                _this.headFace = (user.avatar == null ? _this.headFace : user.avatar.path);
                _this.code = user.code;
                _this.name = user.name;
                _this.phone = user.phone;
                _this.gender = user.sex;
                _this.event.timeStarts = user.birth;
            }
        });
    };
    //选择上传方式
    ContactPage.prototype.choosePic = function () {
        this.nativeService.showPicActionSheet();
    };
    // 初始化上传图片的服务
    ContactPage.prototype.initImgSer = function () {
        var _this = this;
        this.nativeService.upload.fileKey = 'file';
        this.nativeService.upload.url = this.globalConfig.APP_SERVE_URL + this.globalConfig.API.upload; // 上传图片的url，如果同默认配置的url一致，那无须再设置
        this.nativeService.upload.success = function (data) {
            _this.storage.get('user').then(function (user) {
                if (user != null) {
                    _this.userService.httpPostAvatar({
                        id: user._id,
                        avatar: data.id
                    }).subscribe(function (data) {
                        if (data.code == 0) {
                            // this.cd.detectChanges();
                            console.log('头像更新成功');
                            //上传成功后的回调处理
                            _this.loadUserInfo();
                            // this.navCtrl.setRoot(ProfilePage);
                        }
                    });
                }
            });
        };
        this.nativeService.upload.error = function (err) {
            _this.utileService.showToast(_this.toastCtrl, '错误：头像上传失败！');
        };
    };
    ContactPage.prototype.goToOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__orders_orders__["a" /* OrdersPage */]);
    };
    ContactPage.prototype.changeUserName = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__name_name__["a" /* NamePage */], { name: this.user.name });
    };
    ContactPage.prototype.saveSex = function (val) {
        var _this = this;
        var loading = this.utileService.showLoading(this.loadCtrl, '保存中...');
        this.userService.httpPostSex({
            id: this.user._id,
            sex: val
        }).subscribe(function (data) {
            if (data.code == 0) {
                _this.gender = data.data.sex;
                loading.dismiss();
                _this.utileService.showToast(_this.toastCtrl, '更新成功。');
            }
        });
    };
    ContactPage.prototype.saveBirty = function (val) {
        var _this = this;
        var loading = this.utileService.showLoading(this.loadCtrl, '保存中...');
        this.userService.httpPostBirth({
            id: this.user._id,
            birth: val
        }).subscribe(function (data) {
            if (data.code == 0) {
                loading.dismiss();
                _this.utileService.showToast(_this.toastCtrl, '更新成功。');
            }
        });
    };
    ContactPage.prototype.goToAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__user_address_user_address__["a" /* UserAddressPage */]);
    };
    ContactPage.prototype.goToVersion = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__version_version__["a" /* VersionPage */]);
    };
    ContactPage.prototype.goToAbout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__about_about__["a" /* AboutPage */]);
    };
    ContactPage.prototype.loginOut = function () {
        this.storage.remove('user');
        //选中首页
        var tab = this.navCtrl.parent;
        tab.select(0);
        //给首页发送登出的通知事件
        this.events.publish('user:loginOut', null, false);
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/contact/contact.html"*/'<ion-header>\n    <ion-navbar color="primary" no-border-bottom>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <button ion-item class="marginTop" color="primary" (click)="choosePic()">\n        <ion-avatar item-start>\n            <img src="{{headFace}}" alt="" class="user-avatar">\n        </ion-avatar>\n        <h2 class="white name">{{name}}</h2>\n        <p class="name-tips">点击修改头像</p>\n    </button>\n    <ion-list>\n        <ion-list-header>订单与积分</ion-list-header>\n        <ion-item>\n            我的积分\n            <div item-end [innerHtml]="code"></div>\n        </ion-item>\n        <ion-item (click)="goToOrders()">\n            我的订单\n            <ion-icon name="arrow-forward" item-end class="item-icon-left"></ion-icon>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>帐户与安全</ion-list-header>\n        <ion-item (click)="changeUserName()">\n            姓名\n            <div item-end>{{name}}</div>\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n        <ion-item>\n            <ion-label icon-start>性别</ion-label>\n            <ion-select [(ngModel)]="gender" item-end [selectOptions]="selectOptions" cancelText="取消" okText="确定"\n                        (ngModelChange)="saveSex($event)">\n                <ion-option value="先生">先生</ion-option>\n                <ion-option value="女士">女士</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label>生日</ion-label>\n            <ion-datetime displayFormat="YYYY-MM-DD" pickerFormat="YYYY MM DD" [(ngModel)]="event.timeStarts"\n                          (ngModelChange)="saveBirty($event)" cancelText="取消" doneText="确定"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            手机\n            <div item-end>{{phone}}</div>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>地址</ion-list-header>\n        <ion-item (click)="goToAddress()">\n            <!--<i class="iconfont icon-dizhi1"></i>-->\n            收货地址\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>关于</ion-list-header>\n        <ion-item (click)="goToVersion()">\n            版本信息\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n        <ion-item (click)="goToAbout()">\n            关于我们\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n\n    <ion-row margin-horizontal>\n        <button block ion-button color="primary" class="save" (click)="loginOut()">退 出</button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_10__providers_native_native__["a" /* NativeProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage.prototype.ionViewDidEnter = function () {
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/about/about.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>关于我们</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <h2 class="title">盈垦</h2>\n    <div class="about">\n        <p>广西盈垦现代农业有限责任公司成立于2013年10月16日，注册资金200万元。目前拥有两处生产基地，一处加工厂，三个销售办事处，产品销售覆盖广西各大城市，辐射珠三角，是一家集木耳种植，加工，销售于一体的现代化农业企业。</p>\n        <p>公司秉承自然，健康，优质，高效的种植加工理念和细致入微的销售服务理念，经过多年努力，盈垦牌精品木耳丝在广西区内市场得到广泛的认可。2017年在市领导的大力支持下进入百色市科技企业孵化基地，生产加工环境获得的巨大改善，销售业绩也获得了很大的提升，进一步巩固了市场地位。</p>\n        <p>未来，我们将引入互联网销售模式，建立以销售APP为主要交易平台的互联网销售配送体系，提高效率，降低成本，提高用户体验。形成农业生产加工和互联网销售的相互融合的产业链优势，开拓更加广阔的市场。</p>\n        <p>科技改变未来！</p>\n    </div>\n    <div class="copy-right">\n        Copyright ©2013-2018<br/>\n        广西盈垦现代农业有限责任公司\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_validators_validators__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddressPage = /** @class */ (function () {
    function AddressPage(navCtrl, fb, utilService, loadingCtrl, userService, storage, toastCtrl, viewCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.utilService = utilService;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.id = null;
        this.fromGroup = this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phone: ['', [__WEBPACK_IMPORTED_MODULE_6__providers_validators_validators__["a" /* ValidatorsProvider */].phone]],
            address: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        if (this.navParams.get('address')) {
            this.id = this.navParams.get('address')._id;
            this.fromGroup.reset({
                name: this.navParams.get('address').name,
                phone: this.navParams.get('address').phone,
                address: this.navParams.get('address').address
            });
        }
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.user = user;
            }
        });
    }
    AddressPage.prototype.ionViewDidLoad = function () {
    };
    AddressPage.prototype.update = function () {
        var _this = this;
        var loading = this.utilService.showLoading(this.loadingCtrl, '保存中...');
        if (this.fromGroup.valid) {
            if (this.id != null) {
                this.fromGroup.value.id = this.id;
            }
            this.fromGroup.value.userId = this.user._id;
            this.fromGroup.value.is_default = 0;
            this.userService.httpPostAddress(this.fromGroup.value).subscribe(function (data) {
                if (data.code === 0) {
                    _this.viewCtrl.dismiss();
                    loading.dismiss();
                    _this.utilService.showToast(_this.toastCtrl, '更新成功。');
                }
            });
        }
    };
    AddressPage.prototype.remove = function () {
        var _this = this;
        this.userService.delUserAddress(this.id).subscribe(function (data) {
            if (data.code === 0) {
                _this.viewCtrl.dismiss();
            }
        });
    };
    AddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-address',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/address/address.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>收货地址</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <div class="box-wrap">\n        <form [formGroup]="fromGroup">\n            <ion-input formControlName="name" placeholder="收货人"></ion-input>\n            <ion-input formControlName="phone" placeholder="收货人手机号码"></ion-input>\n            <ion-textarea type="text" formControlName="address" placeholder="详细收货地址"\n                          [(ngModel)]="address"></ion-textarea>\n            <ion-row>\n                <ion-col col-8>\n                    <button ion-button block color="primary" [disabled]="!fromGroup.valid" (click)="update()"\n                            class="save">保存\n                    </button>\n                </ion-col>\n                <ion-col col-4>\n                    <button ion-button block color="light" (click)="remove()" class="save">删除</button>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/address/address.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], AddressPage);
    return AddressPage;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_home_service_home_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_detail_product_detail__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirm_order_confirm_order__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_orders_orders__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_util_service_util_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CartPage = /** @class */ (function () {
    function CartPage(navCtrl, homeServiceProvider, orderService, utilService, toastCtrl, events, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.homeServiceProvider = homeServiceProvider;
        this.orderService = orderService;
        this.utilService = utilService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.storage = storage;
        this.cart = [];
        this.sum = 0;
        this.storage.get('cart').then(function (cart) {
            // console.log(cart);
            if (cart != null) {
                var p = 0;
                for (var i = 0; i < cart.length; i++) {
                    p += (cart[i].num ? cart[i].num : 0) * cart[i].product.price;
                }
                _this.sum = p.toFixed(2);
                _this.cart = cart;
            }
        });
        this.events.subscribe('cart:add', function (cart) {
            _this.cart = cart;
            var p = 0;
            for (var i = 0; i < cart.length; i++) {
                p += (cart[i].num ? cart[i].num : 0) * cart[i].product.price;
            }
            _this.sum = p.toFixed(2);
        });
    }
    CartPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.userId = user._id;
            }
        });
        this.getProductList('', 1)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.products = data.data.splice(0, 4);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log(error);
        });
    };
    CartPage.prototype.chooseProduct = function () {
        var p = 0;
        for (var i = 0; i < this.cart.length; i++) {
            p += (this.cart[i].num ? this.cart[i].num : 0) * this.cart[i].product.price;
        }
        this.sum = p.toFixed(2);
    };
    CartPage.prototype.getProductList = function (keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page);
    };
    CartPage.prototype.goToDetail = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__product_detail_product_detail__["a" /* ProductDetailPage */], { id: product._id });
    };
    CartPage.prototype.buyNow = function () {
        var _this = this;
        if (this.sum == 0) {
            this.utilService.showToast(this.toastCtrl, '您没有需要支付的产品');
        }
        else {
            // 生成订单
            this.orderService.httpPostOrder({
                products: JSON.stringify(this.cart),
                sumPrice: this.sum,
                customer: this.userId
            }).subscribe(function (res) {
                if (res.code == 0) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__confirm_order_confirm_order__["a" /* ConfirmOrderPage */], {
                        orders: _this.cart,
                        sn: res.data.no,
                        no: res.data.sn // 订单编号
                    });
                }
            });
        }
    };
    CartPage.prototype.clearCart = function () {
        this.storage.remove('cart');
        this.sum = 0;
        this.cart = [];
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/cart/cart.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-item color="primary" no-border>\n            <!--<ion-title>购物车</ion-title>-->\n            <ion-buttons end>\n                <button ion-button small clear item-end color="dark" (click)="clearCart()">清空购物车</button>\n            </ion-buttons>\n        </ion-item>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="cart-null" *ngIf="cart && cart.length < 1">\n        购物车空空如也，赶快会去挑选商品吧～\n    </div>\n    <div class="product-list">\n        <ion-list>\n            <ion-item *ngFor="let product of cart;">\n                <ion-thumbnail item-start>\n                    <img src="{{product.product.banner.path}}">\n                </ion-thumbnail>\n                <div>\n                    <h2 class="product-name">{{product.product.name}}</h2>\n                    <div>\n                        <p class="price"><i>￥{{product.product.price}}</i>/<b>{{product.product.unit}}</b>\n                        <span style="display: block;">\n                            <del style="color: #999; font-size: 13px;">￥{{product.product.origin_price}}/<span\n                                class="f12">{{product.product.origin_price_unit}}</span></del>\n                        </span>\n                        </p>\n                        <num-count [(ngModel)]="product.num" (click)="chooseProduct($event, product)"\n                                   class="num"></num-count>\n                    </div>\n                </div>\n            </ion-item>\n        </ion-list>\n    </div>\n\n    <h3 class="detail_title" style="text-align: center; margin-top: 80px;">猜您喜欢</h3>\n    <div class="products">\n        <ion-grid>\n            <ion-row>\n                <ion-col *ngFor="let product of products;" col-6>\n                    <ion-card (tap)="goToDetail(product)">\n                        <img alt="" width="100%" src="{{product.banner.path}}" height="147"/>\n                        <ion-card-content>\n                            <p class="name">{{product.name}}</p>\n                        </ion-card-content>\n                        <ion-row>\n                            <ion-col>\n                                <p><i>￥{{product.price}}</i>/<span class="f12">{{product.unit}}</span></p>\n                                <del style="color: #999">￥{{product.origin_price}}/<span class="f12">{{product.origin_price_unit}}</span>\n                                </del>\n                            </ion-col>\n                            <ion-col class="f12 right">\n                                <!--己有0人购买-->\n                            </ion-col>\n                        </ion-row>\n                    </ion-card>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n</ion-content>\n\n<ion-footer>\n    <ion-row>\n        <ion-col item-start col-8 class="sum" style="background: #222; color: #fff;">\n            合计：<i>￥{{sum}}</i>\n        </ion-col>\n        <ion-col icon-end col-4>\n            <button ion-button item-end color="primary" class="go-pay" (click)="buyNow()">结算</button>\n        </ion-col>\n    </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_home_service_home_service__["a" /* HomeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_orders_orders__["a" /* OrdersProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NamePage = /** @class */ (function () {
    function NamePage(navCtrl, fb, utilService, loadingCtrl, userService, storage, toastCtrl, viewCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.utilService = utilService;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.name = '';
        this.name = this.navParams.get('name');
        this.fromGroup = this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.user = user;
            }
        });
    }
    NamePage.prototype.ionViewDidLoad = function () {
    };
    NamePage.prototype.update = function () {
        var _this = this;
        if (this.fromGroup.valid) {
            this.fromGroup.value.id = this.user._id;
            var loading_1 = this.utilService.showLoading(this.loadingCtrl, '保存中...');
            this.userService.httpPostName(this.fromGroup.value).subscribe(function (data) {
                if (data.code === 0) {
                    loading_1.dismiss();
                    _this.utilService.showToast(_this.toastCtrl, '更改成功。');
                    _this.viewCtrl.dismiss();
                }
            });
        }
    };
    NamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-name',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/name/name.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>姓名</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <div class="box-wrap">\n        <form [formGroup]="fromGroup">\n            <ion-input type="text" formControlName="name" placeholder="输入姓名" [(ngModel)]="name"></ion-input>\n            <button ion-button block large [disabled]="!fromGroup.valid" (click)="update()" class="save">保存</button>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/name/name.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], NamePage);
    return NamePage;
}());

//# sourceMappingURL=name.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notification_notification__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationPage = /** @class */ (function () {
    function NotificationPage(navCtrl, storage, notificationProvider, events, navParams) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.notificationProvider = notificationProvider;
        this.events = events;
        this.navParams = navParams;
        this.showNotification = false;
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val != null) {
                _this.userId = val._id;
                _this.getNotification();
            }
        });
    };
    NotificationPage.prototype.getNotification = function () {
        var _this = this;
        this.notificationProvider.getUserNotificationList(this.userId).subscribe(function (res) {
            if (res.code === 0) {
                _this.items = res.data;
                if (res.data.length > 0) {
                    _this.showNotification = true;
                }
            }
        });
    };
    NotificationPage.prototype.removeItem = function (item) {
        var _this = this;
        this.notificationProvider.delUserNotification(item._id, this.userId)
            .subscribe(function (res) {
            if (res.code === 0) {
                for (var i = 0; i < _this.items.length; i++) {
                    if (_this.items[i] == item) {
                        _this.items.splice(i, 1);
                    }
                }
                _this.events.publish('notification:del', res.data.unReadNum);
            }
        });
    };
    NotificationPage.prototype.readItem = function (item) {
        var _this = this;
        if (item.read == 0) {
            this.notificationProvider.readUserNotification(item._id, this.userId)
                .subscribe(function (res) {
                if (res.code === 0) {
                    item.read = 1;
                    _this.events.publish('notification:read', res.data.unReadNum);
                }
            });
        }
    };
    NotificationPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.notificationProvider.getUserNotificationList(this.userId).subscribe(function (res) {
            if (res.code === 0) {
                _this.items = res.data;
                refresher.complete();
            }
        });
    };
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/notification/notification.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>通知</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n            pullingIcon="arrow-down"\n            pullingText="下拉刷新页面"\n            refreshingSpinner="circles"\n            refreshingText="数据加载中..."\n        ></ion-refresher-content>\n    </ion-refresher>\n\n    <div *ngIf="showNotification">\n        <ion-list class="notification">\n            <ion-item-sliding *ngFor="let item of items">\n                <ion-item>\n                    <h2 [class.font-bold]="item.read == 0">{{item.content}}</h2>\n                    <p>{{item.createdAt | date: \'yyyy-MM-dd HH:mm:ss\'}}</p>\n                </ion-item>\n                <ion-item-options>\n                    <button class="remove read" (click)="readItem(item)">&nbsp;&nbsp;{{item.read == 0 ? \'未读\' : \'己读\'}}&nbsp;&nbsp;</button>\n                    <button class="remove" (click)="removeItem(item)">&nbsp;&nbsp;删除&nbsp;&nbsp;</button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </ion-list>\n    </div>\n    <div *ngIf="!showNotification">\n        <p class="is-none" style="text-align: center; color: #666;">暂未收到任何通知</p>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/notification/notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notification_notification__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_detail_product_detail__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductListPage = /** @class */ (function () {
    function ProductListPage(navCtrl, loadingCtrl, utilServiceProvider, viewCtl, homeServiceProvider) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.utilServiceProvider = utilServiceProvider;
        this.viewCtl = viewCtl;
        this.homeServiceProvider = homeServiceProvider;
        this.last = false;
        this.page = 1;
    }
    ProductListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProduct('', 1)
            .subscribe(function (data) {
            loading.dismiss();
            if (data.code == 0) {
                _this.products = data.data;
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    ProductListPage.prototype.dismiss = function () {
        this.viewCtl.dismiss();
    };
    ProductListPage.prototype.search = function () {
        var _this = this;
        this.getProduct(this.keywords, 1)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.products = data.data;
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    ProductListPage.prototype.getProduct = function (keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page);
    };
    ProductListPage.prototype.goToDetail = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__product_detail_product_detail__["a" /* ProductDetailPage */], { id: product._id });
    };
    ProductListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.page = 1;
        this.getProduct('', this.page)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.products = data.data;
                if (_this.infiniteScroll) {
                    _this.infiniteScroll.enable(true);
                }
                refresher.complete();
            }
            loading.dismiss();
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    ProductListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.page++;
        this.infiniteScroll = infiniteScroll;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProduct(this.keywords || '', this.page)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.last = data.isLast;
                _this.products = _this.products.concat(data.data);
                _this.products.concat(data.data);
                infiniteScroll.complete();
                if (_this.last) {
                    infiniteScroll.enable(false);
                }
            }
            loading.dismiss();
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    ProductListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-list',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/product-list/product-list.html"*/'<ion-header>\n    <ion-navbar no-border-bottom color="primary">\n        <ion-title>选购</ion-title>\n        <button ion-button clear (click)="dismiss()">\n            <span ion-text showWhen="ios" class="white">取消</span>\n            <ion-icon name="md-close" showWhen="android" class="white"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n            pullingIcon="arrow-down"\n            pullingText="下拉刷新页面"\n            refreshingSpinner="circles"\n            refreshingText="数据加载中..."\n        ></ion-refresher-content>\n    </ion-refresher>\n    <div>\n        <ion-item color="primary">\n            <ion-searchbar (input)="search()" placeholder="输入要搜索的关键字" [(ngModel)]="keywords"></ion-searchbar>\n        </ion-item>\n        <div class="product-list">\n            <ion-grid>\n                <ion-row>\n                    <ion-col *ngFor="let product of products;" col-6>\n                        <ion-card (tap)="goToDetail(product)">\n                            <img alt="" width="100%" src="{{product.banner.path}}" height="147"/>\n                            <ion-card-content>\n                                <p class="name">{{product.name}}</p>\n                            </ion-card-content>\n                            <ion-row>\n                                <ion-col>\n                                    <p><i>￥{{product.price}}</i>/<span class="f12">{{product.unit}}</span></p>\n                                    <del style="color: #999">￥{{product.origin_price}}/<span class="f12">{{product.origin_price_unit}}</span></del>\n                                </ion-col>\n                                <ion-col class="f12 right">\n                                    <!--己有0人购买-->\n                                </ion-col>\n                            </ion-row>\n                        </ion-card>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n<!--            <ion-list no-padding>-->\n<!--                <ion-item no-padding *ngFor="let product of products" (click)="goToDetail(product)">-->\n<!--                    <ion-grid>-->\n<!--                        <ion-row>-->\n<!--                            <ion-col col-3><img src="{{product.banner.path}}" width="80" height="80"></ion-col>-->\n<!--                            <ion-col col-9>-->\n<!--                                <h2 text-left class="product-name">{{product.name}}</h2>-->\n<!--                                <p class="price" style="margin-bottom: 0;"><i>￥{{product.price}}</i>/<b>{{product.unit}}</b></p>-->\n<!--                                <del style="color: #999; font-size: 13px;">￥{{product.origin_price}}/<span class="f12">{{product.origin_price_unit}}</span></del>-->\n<!--                                <p text-right>-->\n<!--                                    &lt;!&ndash;己有0人购买&ndash;&gt;-->\n<!--                                </p>-->\n<!--                            </ion-col>-->\n<!--                        </ion-row>-->\n<!--                    </ion-grid>-->\n<!--                </ion-item>-->\n<!--            </ion-list>-->\n        </div>\n    </div>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content\n            loadingSpinner="bubbles"\n            loadingText="加载更多中..."\n        ></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/product-list/product-list.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__["a" /* HomeServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__["a" /* HomeServiceProvider */]) === "function" && _e || Object])
    ], ProductListPage);
    return ProductListPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=product-list.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VersionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_native_native__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VersionPage = /** @class */ (function () {
    function VersionPage(navCtrl, nativeService) {
        this.navCtrl = navCtrl;
        this.nativeService = nativeService;
    }
    VersionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.nativeService.getVersionNumber().subscribe(function (val) {
            if (val != null) {
                _this.versionNumber = val;
            }
        }, function (error) {
            console.log(error);
        });
    };
    VersionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-version',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/version/version.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>当前版本</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <div item-start class="version">版本号</div>\n            <div item-end>{{versionNumber}}</div>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/version/version.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_native_native__["a" /* NativeProvider */]])
    ], VersionPage);
    return VersionPage;
}());

//# sourceMappingURL=version.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * 公共方法
 */
var UtilServiceProvider = /** @class */ (function () {
    function UtilServiceProvider(inAppBrowser, diagnostic, platform, appVersion, alertCtrl) {
        var _this = this;
        this.inAppBrowser = inAppBrowser;
        this.diagnostic = diagnostic;
        this.platform = platform;
        this.appVersion = appVersion;
        this.alertCtrl = alertCtrl;
        /**
         * 每次调用sequence加1
         * @type {()=>number}
         */
        this.getSequence = (function () {
            // let sequence = 1;
            // return () => {
            //     return ++sequence;
            // };
            return new Date().getTime();
        })();
        /**
         * 检测app是否有读取存储权限,如果没有权限则会请求权限
         */
        this.externalStoragePermissionsAuthorization = (function () {
            var havePermission = false;
            return function () {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
                    if (havePermission) {
                        observer.next(true);
                    }
                    else {
                        var permissions_1 = [_this.diagnostic.permission.READ_EXTERNAL_STORAGE, _this.diagnostic.permission.WRITE_EXTERNAL_STORAGE];
                        _this.diagnostic.getPermissionsAuthorizationStatus(permissions_1).then(function (res) {
                            if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
                                havePermission = true;
                                observer.next(true);
                            }
                            else {
                                havePermission = false;
                                _this.diagnostic.requestRuntimePermissions(permissions_1).then(function (res) {
                                    if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
                                        havePermission = true;
                                        observer.next(true);
                                    }
                                    else {
                                        havePermission = false;
                                        _this.alertCtrl.create({
                                            title: '缺少读取存储权限',
                                            subTitle: '请在手机设置或app权限管理中开启',
                                            buttons: [{ text: '取消' },
                                                {
                                                    text: '去开启',
                                                    handler: function () {
                                                        _this.diagnostic.switchToSettings();
                                                    }
                                                }
                                            ]
                                        }).present();
                                        observer.error(false);
                                    }
                                }).catch(function (err) {
                                    console.log(err, '调用diagnostic.requestRuntimePermissions方法失败');
                                    observer.error(false);
                                });
                            }
                        }).catch(function (err) {
                            console.log(err, '调用diagnostic.getPermissionsAuthorizationStatus方法失败');
                            observer.error(false);
                        });
                    }
                });
            };
        })();
    }
    /**
     * 通用的展示 loading 的组件
     *
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
    UtilServiceProvider.prototype.showLoading = function (loadingCtrl, message) {
        var loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
    };
    /**
     * 通用的展示 toast 的组件
     *
     * @protected
     * @param {ToastController} toastCtrl
     * @param {string} message
     * @returns {Toast}
     * @memberof BaseUI
     */
    UtilServiceProvider.prototype.showToast = function (toastCtrl, message) {
        var toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    /**
     * @param message
     * @param callback
     */
    UtilServiceProvider.prototype.alert = function (alertCtrl, message, callback) {
        if (callback) {
            var alert_1 = alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [
                    {
                        text: '取消',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: "确定",
                        handler: function (data) {
                            callback();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            var alert_2 = alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert_2.present();
        }
    };
    /**
     * AlloyLever,一款本地"开发者工具"
     * 文档:https:// github.com/AlloyTeam/AlloyLever
     */
    UtilServiceProvider.prototype.alloyLeverInit = function () {
        AlloyLever.config({
            cdn: 'http://s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',
            /*reportUrl: "// a.qq.com",  // 错误上报地址
            reportPrefix: 'qun',    // 错误上报msg前缀，一般用于标识业务类型
            reportKey: 'msg',        // 错误上报msg前缀的key，用户上报系统接收存储msg
            otherReport: {              // 需要上报的其他信息
              uin: 491862102
            },*/
            entry: '#entry' // 请点击这个DOM元素6次召唤vConsole。// 你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
        });
        AlloyLever.entry('#entry2');
    };
    /**
     * 通过浏览器打开url
     */
    UtilServiceProvider.prototype.openUrlByBrowser = function (url) {
        this.inAppBrowser.create(url, '_system');
    };
    /**
     * 是否真机环境
     */
    UtilServiceProvider.prototype.isMobile = function () {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    };
    /**
     * 是否android真机环境
     */
    UtilServiceProvider.prototype.isAndroid = function () {
        return this.isMobile() && this.platform.is('android');
    };
    /**
     * 是否ios真机环境
     */
    UtilServiceProvider.prototype.isIos = function () {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    };
    /**
     * 获得app版本号,如0.01
     * @description  对应/config.xml中version的值
     */
    UtilServiceProvider.prototype.getVersionNumber = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.appVersion.getVersionNumber().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                console.log(err, '获得app版本号失败');
                observer.error(false);
            });
        });
    };
    /**
     * 获得app包名/id,如com.kit.ionic2tabs
     * @description  对应/config.xml中id的值
     */
    UtilServiceProvider.prototype.getPackageName = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.appVersion.getPackageName().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                console.log(err, '获得app包名失败');
                observer.error(false);
            });
        });
    };
    UtilServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], UtilServiceProvider);
    return UtilServiceProvider;
}());

//# sourceMappingURL=util-service.js.map

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		433,
		11
	],
	"../pages/address/address.module": [
		434,
		10
	],
	"../pages/cart/cart.module": [
		435,
		9
	],
	"../pages/confirm-order/confirm-order.module": [
		444,
		8
	],
	"../pages/login/login.module": [
		436,
		7
	],
	"../pages/name/name.module": [
		437,
		6
	],
	"../pages/notification/notification.module": [
		438,
		5
	],
	"../pages/orders/orders.module": [
		439,
		4
	],
	"../pages/product-detail/product-detail.module": [
		440,
		3
	],
	"../pages/product-list/product-list.module": [
		441,
		2
	],
	"../pages/user-address/user-address.module": [
		442,
		1
	],
	"../pages/version/version.module": [
		443,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 202;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PayProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 支付相关服务
 */
var PayProvider = /** @class */ (function () {
    function PayProvider(http, globalConfig) {
        this.http = http;
        this.globalConfig = globalConfig;
        // console.log('Hello PayProvider Provider');
    }
    PayProvider.prototype.postPayInfo = function (request) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'pay_info?subject=' + request.subject + '&body=' + request.body + '&amount=' + request.amount + '&outTradeId=' + request.outTradeId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    PayProvider.prototype.queryOrder = function (sn, tradeId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'query_order?sn=' + sn + '&trade_id=' + tradeId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    PayProvider.prototype.postWxPay = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + 'wx_pay/order', request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    PayProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], PayProvider);
    return PayProvider;
}());

//# sourceMappingURL=pay.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_notification__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_notification_notification__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = /** @class */ (function () {
    function TabsPage(modalCtrl, storage, notificationService, events) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.notificationService = notificationService;
        this.events = events;
        this.isLogin = false;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__notification_notification__["a" /* NotificationPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
        this.events.subscribe('user:login', function (user, hasLogin) {
            _this.isLogin = hasLogin;
        });
        this.events.subscribe('notification:del', function (num) {
            _this.notificationNum = num;
        });
        this.events.subscribe('notification:read', function (num) {
            _this.notificationNum = num;
        });
    }
    TabsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val !== null) {
                _this.isLogin = true;
                _this.userId = val._id;
                _this.getNotification();
            }
        });
    };
    TabsPage.prototype.tabChange = function ($event) {
        if ($event.index > 0) {
            this.checkLogin();
        }
    };
    TabsPage.prototype.checkLogin = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val !== null) {
                _this.isLogin = true;
                _this.userId = val._id;
                _this.getNotification();
            }
            else {
                _this.tabRef.select(0);
                var loginModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                loginModal.present();
            }
        });
    };
    TabsPage.prototype.getNotification = function () {
        var _this = this;
        this.notificationService.unReadUserNotification(this.userId)
            .subscribe(function (res) {
            if (res.code === 0) {
                if (res.data.length > 0) {
                    _this.notificationNum = res.data.length;
                }
                else if (res.data.length == 0) {
                    _this.notificationNum = '';
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/tabs/tabs.html"*/'<ion-tabs (ionChange)="tabChange($event)" #myTabs>\n    <ion-tab [root]="tab1Root" tabTitle="首页" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="通知" tabIcon="information-circle" tabBadge="{{notificationNum}}"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="购物车" tabIcon="cart"></ion-tab>\n    <ion-tab [root]="tab4Root" tabTitle="我的" tabIcon="contact"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__providers_notification_notification__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_list_product_list__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_detail_product_detail__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__contact_contact__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, utilServiceProvider, loadingCtrl, storage, globalConfig, modalCtrl, events, toastControll, homeServiceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.utilServiceProvider = utilServiceProvider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.globalConfig = globalConfig;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.toastControll = toastControll;
        this.homeServiceProvider = homeServiceProvider;
        this.slides = [
            'http://cdn.gxyingken.com/banner_1.jpg?imageView2/2/w/720/q/60',
            'http://cdn.gxyingken.com/banner_2.jpg?imageView2/2/w/720/q/60'
        ];
        this.last = false;
        this.isLogin = false;
        this.page = 1;
        this.events.subscribe('user:login', function (user, hasLogin) {
            _this.isLogin = hasLogin;
            _this.avatar = (user.avatar == null ? _this.globalConfig.DEFAULT_AVATAR : user.avatar.path);
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.subscribe('user:loginOut', function (user, hasLogin) {
            _this.isLogin = hasLogin;
            _this.avatar = _this.globalConfig.DEFAULT_AVATAR;
        });
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.isLogin = true;
                _this.avatar = (user.avatar == null ? _this.globalConfig.DEFAULT_AVATAR : user.avatar.path);
            }
        });
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', 1)
            .subscribe(function (data) {
            loading.dismiss();
            if (data.code == 0) {
                _this.products = data.data;
            }
        }, function (error) {
            _this.errorMessage = error;
            _this.utilServiceProvider.showToast(_this.toastControll, error);
            console.log(error);
        });
    };
    HomePage.prototype.getProductList = function (keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page);
    };
    HomePage.prototype.goToProductList = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__product_list_product_list__["a" /* ProductListPage */]);
    };
    HomePage.prototype.goToDetail = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__product_detail_product_detail__["a" /* ProductDetailPage */], { id: product._id });
    };
    HomePage.prototype.login = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__contact_contact__["a" /* ContactPage */]);
            }
            else {
                var loginModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                loginModal.present();
            }
        });
    };
    HomePage.prototype.goToProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__contact_contact__["a" /* ContactPage */]);
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.page = 1;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', this.page)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.products = data.data;
                if (_this.infiniteScroll) {
                    _this.infiniteScroll.enable(true);
                }
                refresher.complete();
            }
            loading.dismiss();
        }, function (error) {
            _this.errorMessage = error;
            _this.utilServiceProvider.showToast(_this.toastControll, error);
            console.log(error);
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.page++;
        this.infiniteScroll = infiniteScroll;
        var loading = this.utilServiceProvider.showLoading(this.loadingCtrl);
        this.getProductList('', this.page)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.last = data.isLast;
                _this.products = _this.products.concat(data.data);
                _this.products.concat(data.data);
                infiniteScroll.complete();
                if (_this.last) {
                    console.log(_this.last);
                    infiniteScroll.enable(false);
                }
            }
            loading.dismiss();
        }, function (error) {
            _this.errorMessage = error;
            _this.utilServiceProvider.showToast(_this.toastControll, error);
            console.log(error);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-item color="primary">\n            <div item-start>盈垦</div>\n            <ion-searchbar (keyup)="goToProductList($event)" placeholder="输入要搜索的关键字"></ion-searchbar>\n            <i class="iconfont icon-71 user" item-end (click)="login()" *ngIf="!isLogin"></i>\n            <img src="{{avatar}}" alt="" *ngIf="isLogin" item-end (click)="goToProfile()" class="avatar">\n        </ion-item>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n            pullingIcon="arrow-down"\n            pullingText="下拉刷新页面"\n            refreshingSpinner="circles"\n            refreshingText="数据加载中..."\n        ></ion-refresher-content>\n    </ion-refresher>\n    <ion-slides style="height: 150px;" autoplay="3000" pager loop="true" zoom="true">\n        <ion-slide *ngFor="let slide of slides">\n            <img src="{{slide}}" alt="">\n        </ion-slide>\n    </ion-slides>\n    <div>\n        <ion-item class="title" no-border>\n            <div item-start style="margin: 8px 16px;">热销产品</div>\n            <button ion-button clear small color="danger" item-end (click)="goToProductList()" class="more">更多>></button>\n        </ion-item>\n    </div>\n    <div class="products">\n        <ion-grid>\n            <ion-row>\n                <ion-col *ngFor="let product of products;" col-6>\n                    <ion-card (tap)="goToDetail(product)">\n                        <img alt="" width="100%" src="{{product.banner.path}}" height="147"/>\n                        <ion-card-content>\n                            <p class="name">{{product.name}}</p>\n                        </ion-card-content>\n                        <ion-row>\n                            <ion-col>\n                                <p><i>￥{{product.price}}</i>/<span class="f12">{{product.unit}}</span></p>\n                                <del style="color: #999">￥{{product.origin_price}}/<span class="f12">{{product.origin_price_unit}}</span></del>\n                            </ion-col>\n                            <ion-col class="f12 right">\n                                <!--己有0人购买-->\n                            </ion-col>\n                        </ion-row>\n                    </ion-card>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content\n            loadingSpinner="bubbles"\n            loadingText="加载更多中..."\n        ></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__providers_global_config_global_config__["a" /* GlobalConfigProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_global_config_global_config__["a" /* GlobalConfigProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__["a" /* HomeServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__["a" /* HomeServiceProvider */]) === "function" && _j || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_opener__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * 版本升级
 */
var UpdateProvider = /** @class */ (function () {
    function UpdateProvider(transfer, file, utilService, fileOpener, http, globalConfig, alertCtrl) {
        this.transfer = transfer;
        this.file = file;
        this.utilService = utilService;
        this.fileOpener = fileOpener;
        this.http = http;
        this.globalConfig = globalConfig;
        this.alertCtrl = alertCtrl;
        this.appDownloadPageUrl = 'https://fir.im/emzu'; // 下载页访问地址
        // app更新进度.默认为0,在app升级过程中会改变
        this.updateProgress = -1;
    }
    UpdateProvider.prototype.checkVersion = function () {
        var _this = this;
        if (!this.utilService.isMobile()) {
            return;
        }
        // 获得app当前版本号
        this.utilService.getVersionNumber().subscribe(function (currentVersionNo) {
            _this.currentVersionNo = currentVersionNo;
            _this.http.get(_this.globalConfig.APP_SERVE_URL + 'admin/get/version')
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators__["map"])(function (res) { return res.json(); }))
                .subscribe(function (res) {
                if (!res || res.code != 0) {
                    console.log('从版本管理服务中获取版本信息失败');
                    return;
                }
                if (res.code == 0 && res.data && !res.data.versionNumber) {
                    console.log('从版本管理服务中未找到最新版本信息');
                    return;
                }
                var data = res.data;
                _this.lastVersionInfo = data.version;
                _this.latestVersionNo = data.versionNumber;
                _this.iosUrl = data.iosUrl;
                _this.apkUrl = data.androidUrl;
                if (_this.latestVersionNo && (_this.currentVersionNo == _this.latestVersionNo)) {
                    console.log('已经是最新版本');
                    return;
                }
                var cNo = parseInt(_this.currentVersionNo.replace(/\./g, ''), 10);
                var lNo = parseInt(_this.latestVersionNo.replace(/\./g, ''), 10);
                if (cNo < lNo) {
                    var that_1 = _this;
                    var alert_1 = _this.alertCtrl.create({
                        title: '升级',
                        subTitle: '发现新版本,立即升级以便更好的为您服务！',
                        enableBackdropDismiss: false,
                        buttons: [{
                                text: '马上升级', handler: function () {
                                    that_1.downloadApp();
                                }
                            }]
                    });
                    alert_1.present();
                }
            }, function (err) {
                console.log(err, '从版本管理服务中获取版本信息失败');
            });
        });
    };
    /**
     * 下载app
     */
    UpdateProvider.prototype.downloadApp = function () {
        var _this = this;
        if (this.utilService.isIos()) {
            // ios打开网页下载
            console.log(this.iosUrl);
            this.utilService.openUrlByBrowser(this.iosUrl);
        }
        if (this.utilService.isAndroid()) {
            if (!this.apkUrl) {
                this.utilService.alert(this.alertCtrl, '未找到android apk下载地址');
                return;
            }
            this.utilService.externalStoragePermissionsAuthorization().subscribe(function () {
                var backgroundProcess = false; // 是否后台下载
                var alert; // 显示下载进度
                alert = _this.alertCtrl.create({
                    title: '下载进度：0%',
                    enableBackdropDismiss: false,
                    buttons: [{
                            text: '后台下载', handler: function () {
                                backgroundProcess = true;
                            }
                        }]
                });
                alert.present();
                // 下载并安装apk
                var fileTransfer = _this.transfer.create();
                var apk = _this.file.externalRootDirectory + 'download/' + ("android_" + new Date().getTime() + ".apk"); // 下载apk保存的目录
                console.log(_this.apkUrl);
                fileTransfer.download(_this.apkUrl, apk).then(function (entry) {
                    alert && alert.dismiss();
                    console.log('download complete: ' + entry.toURL());
                    // 如果出现应用未安装的现象，请确保两个apk的源是同一个，可以看笔记
                    _this.fileOpener.open(entry.toURL(), 'application/vnd.android.package-archive');
                }, function (err) {
                    _this.updateProgress = -1;
                    alert && alert.dismiss();
                    console.log(err, 'android app 本地升级失败');
                    _this.alertCtrl.create({
                        title: '前往网页下载',
                        subTitle: '本地升级失败',
                        buttons: [{
                                text: '确定', handler: function () {
                                    _this.utilService.openUrlByBrowser(_this.appDownloadPageUrl); // 打开网页下载
                                }
                            }
                        ]
                    }).present();
                });
                // 显示下载进度
                var timer = null; // 由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
                fileTransfer.onProgress(function (event) {
                    var progress = Math.floor(event.loaded / event.total * 100); // 下载进度
                    _this.updateProgress = progress;
                    if (!timer) {
                        // 更新下载进度
                        timer = setTimeout(function () {
                            if (progress === 100) {
                                alert && alert.dismiss();
                            }
                            else {
                                if (!backgroundProcess) {
                                    var title = document.getElementsByClassName('alert-title')[0];
                                    title && (title.innerHTML = "\u4E0B\u8F7D\u8FDB\u5EA6\uFF1A" + progress + "%");
                                }
                            }
                            clearTimeout(timer);
                            timer = null;
                        }, 1000);
                    }
                });
            });
        }
    };
    UpdateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__global_config_global_config__["a" /* GlobalConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], UpdateProvider);
    return UpdateProvider;
}());

//# sourceMappingURL=update.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(282);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_home_service_home_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_native_native__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_notification_notification__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_orders_orders__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_validators_validators__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_product_list_product_list__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_product_detail_product_detail__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_notification_notification__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_cart_cart__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_orders_orders__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_name_name__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_address_address__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_version_version__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_app_version__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_image_picker__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_file_transfer__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_file__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_components_module__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_confirm_order_confirm_order__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_pay_pay__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_wechat_chenyu__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_update_update__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_diagnostic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_file_opener__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_user_address_user_address__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















// import {HttpClientModule} from "@angular/common/http";

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_product_list_product_list__["a" /* ProductListPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_product_detail_product_detail__["a" /* ProductDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_name_name__["a" /* NamePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_version_version__["a" /* VersionPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_confirm_order_confirm_order__["a" /* ConfirmOrderPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_user_address_user_address__["a" /* UserAddressPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                // HttpClientModule,
                __WEBPACK_IMPORTED_MODULE_32__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_34__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_35__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    tabsHideOnSubPages: 'true',
                    mode: 'ios' //把所有平台设置为iOS风格
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/address/address.module#AddressPageModule', name: 'AddressPage', segment: 'address', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/name/name.module#NamePageModule', name: 'NamePage', segment: 'name', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-detail/product-detail.module#ProductDetailPageModule', name: 'ProductDetailPage', segment: 'product-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-list/product-list.module#ProductListPageModule', name: 'ProductListPage', segment: 'product-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-address/user-address.module#UserAddressPageModule', name: 'UserAddressPage', segment: 'user-address', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/version/version.module#VersionPageModule', name: 'VersionPage', segment: 'version', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/confirm-order/confirm-order.module#ConfirmOrderPageModule', name: 'ConfirmOrderPage', segment: 'confirm-order', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_product_list_product_list__["a" /* ProductListPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_product_detail_product_detail__["a" /* ProductDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_name_name__["a" /* NamePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_version_version__["a" /* VersionPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_confirm_order_confirm_order__["a" /* ConfirmOrderPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_user_address_user_address__["a" /* UserAddressPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_global_config_global_config__["a" /* GlobalConfigProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_home_service_home_service__["a" /* HomeServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_native_native__["a" /* NativeProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_notification_notification__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_orders_orders__["a" /* OrdersProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_16__providers_util_service_util_service__["a" /* UtilServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_validators_validators__["a" /* ValidatorsProvider */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_34__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_14__providers_orders_orders__["a" /* OrdersProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_pay_pay__["a" /* PayProvider */],
                __WEBPACK_IMPORTED_MODULE_38_wechat_chenyu__["a" /* WechatChenyu */],
                __WEBPACK_IMPORTED_MODULE_39__providers_update_update__["a" /* UpdateProvider */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_file_opener__["a" /* FileOpener */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalConfigProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * 全局常量配置
 */
var GlobalConfigProvider = /** @class */ (function () {
    function GlobalConfigProvider() {
        this.APP_SERVE_URL = 'http://admin.gxyingken.com/api/'; // 后台Api地址
        // APP_SERVE_URL = 'http://192.168.1.100/api/';
        this.IS_DEBUG = true; // 是否开发(调试)模式
        this.DEFAULT_AVATAR = './assets/imgs/avatar.png'; // 用户默认头像
        this.PAGE_SIZE = 10; // 默认分页大小
        this.IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
        this.QUALITY_SIZE = 94; // 图像压缩质量，范围为0 - 100
        this.REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒
        this.API = {
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
            search: 'products/list',
            orderAdd: 'order/add',
            orderList: 'order/list',
            updateOrder: 'order/confirm_order',
            userNotificationList: 'notification',
            delUserNotification: 'notification/delete',
            readUserNotification: 'notification/read',
            unReadUserNotification: 'notification/unread',
            postAddress: 'user/address',
            userAddress: 'user/address-list',
            changeDefaultAddress: 'user/address/be-default',
            delUserAddress: 'user/del-address',
            defaultAddress: 'user/default-address',
        };
        // console.log('Hello GlobalConfigProvider Provider');
    }
    GlobalConfigProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], GlobalConfigProvider);
    return GlobalConfigProvider;
}());

//# sourceMappingURL=global-config.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_update_update__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, utilService, updateService, globalConfig) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.utilService = utilService;
        this.updateService = updateService;
        this.globalConfig = globalConfig;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.platform.ready().then(function () {
            if (_this.globalConfig.IS_DEBUG) {
                _this.utilService.alloyLeverInit(); // 本地"开发者工具"
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // 注意（重点）：在平台准备好后再加载插件，否则会报错
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.updateService.checkVersion(); // 版本升级检测
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_update_update__["a" /* UpdateProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__num_count_num_count__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__num_count_num_count__["a" /* NumCountComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__num_count_num_count__["a" /* NumCountComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NUM_COUNT_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumCountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NUM_COUNT_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return NumCountComponent; }),
    multi: true
};
var NumCountComponent = /** @class */ (function () {
    function NumCountComponent() {
        this.count = 0;
        this.onChanged = function (_) {
        }; // 这里要给一个值
        // console.log(this);
    }
    NumCountComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.count = obj;
        }
    };
    NumCountComponent.prototype.registerOnChange = function (fn) {
        this.onChanged = fn;
    };
    NumCountComponent.prototype.registerOnTouched = function (fn) {
    };
    NumCountComponent.prototype.increment = function () {
        this.count++;
        this.onChanged(this.count);
    };
    NumCountComponent.prototype.decrement = function () {
        if (this.count > 0) {
            this.count--;
        }
        this.onChanged(this.count);
    };
    NumCountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'num-count',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/components/num-count/num-count.html"*/'<div class="num-control">\n    <button (click)="decrement()" icon-end *ngIf="count > 0"><i class="iconfont icon-delicon"></i></button>\n    <span class="text-num">{{count}}</span>\n    <button (click)="increment()" icon-start><i class="iconfont icon-add1"></i></button>\n</div>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/components/num-count/num-count.html"*/,
            providers: [NUM_COUNT_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], NumCountComponent);
    return NumCountComponent;
}());

//# sourceMappingURL=num-count.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 用户相关接口
 */
var UserProvider = /** @class */ (function () {
    function UserProvider(http, globalConfig) {
        this.http = http;
        this.globalConfig = globalConfig;
    }
    // 用户登录
    UserProvider.prototype.httpPost = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.login, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 获取用户信息
    UserProvider.prototype.httpGetUser = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.profile + '?id=' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新头像
    UserProvider.prototype.httpPostAvatar = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新姓名
    UserProvider.prototype.httpPostName = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新性别
    UserProvider.prototype.httpPostSex = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新生日
    UserProvider.prototype.httpPostBirth = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.saveProfile, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新收货地址
    UserProvider.prototype.httpPostAddress = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.postAddress, request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 用户收货地址
    UserProvider.prototype.getHttpUserAddress = function (userId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.userAddress + '?userId=' + userId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 更新默认收货地址
    UserProvider.prototype.changeUserDefaultAddress = function (userId, addressId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.changeDefaultAddress + '?userId=' + userId + '&addressId=' + addressId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 删除收货地址
    UserProvider.prototype.delUserAddress = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.delUserAddress + '?id=' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 获取用户默认收货地址
    UserProvider.prototype.getDefaultUserAddress = function (userId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.defaultAddress + '?userId=' + userId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 获取验证码
    UserProvider.prototype.httpGetVerifyCode = function (phone) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.verifyCode + '?phone=' + phone)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    // 获取商家信息（管理员）
    UserProvider.prototype.httpGetAdminId = function () {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'get_admin_id')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 首页请求服务
 */
var HomeServiceProvider = /** @class */ (function () {
    function HomeServiceProvider(http, globalConfig) {
        this.http = http;
        this.globalConfig = globalConfig;
    }
    HomeServiceProvider.prototype.getProductList = function (keywords, page) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.search + '?keywords=' + keywords + '&page=' + page)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    HomeServiceProvider.prototype.getProductById = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.getProductById + '/' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    HomeServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], HomeServiceProvider);
    return HomeServiceProvider;
}());

//# sourceMappingURL=home-service.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_config_global_config__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 订单相关服务
 */
var OrdersProvider = /** @class */ (function () {
    function OrdersProvider(http, globalConfig) {
        this.http = http;
        this.globalConfig = globalConfig;
        // console.log('Hello OrdersProvider Provider');
    }
    OrdersProvider.prototype.httpPostOrder = function (request) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.orderAdd + '?products=' + request.products + '&sumPrice=' + request.sumPrice + '&customer=' + request.customer)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpGetOrderById = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.orderList + '?id=' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpUpdateOrderById = function (id, payWay) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.updateOrder + '/' + id + '/' + payWay)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpPostCode = function (request) {
        return this.http.post(this.globalConfig.APP_SERVE_URL + 'update_code', request)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpDelOrder = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'order/del/' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpChangeAddress = function (sn, addressId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'order/change-address/' + sn + '/' + addressId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider.prototype.httpChangePayDate = function (sn) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'wx_pay/' + sn)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    OrdersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], OrdersProvider);
    return OrdersProvider;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__confirm_order_confirm_order__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_orders_orders__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, homeServiceProvider, loadingCtrl, utilService, toastCtl, modalCtrl, viewCtrl, events, storage, orderService, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.homeServiceProvider = homeServiceProvider;
        this.loadingCtrl = loadingCtrl;
        this.utilService = utilService;
        this.toastCtl = toastCtl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.storage = storage;
        this.orderService = orderService;
        this.navParams = navParams;
        this.isLogin = false;
        this.id = this.navParams.get('id');
        // 订阅模式：不适合在页面间通知，只适合在同一个页面，因为这里还有buynow,所以需要订阅一上
        events.subscribe('user:login', function (user, hasLogin) {
            _this.userId = user._id;
            _this.isLogin = hasLogin;
        });
        // 本地存储的方式：适用于不同的页面间通知,接受tab那边登录过，这里需要去本地存储当中取出登录状态
        this.storage.get('user').then(function (val) {
            if (val !== null) {
                _this.isLogin = true;
                _this.userId = val._id;
            }
        });
    }
    ProductDetailPage_1 = ProductDetailPage;
    ProductDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.utilService.showLoading(this.loadingCtrl);
        this.getProductById(this.id)
            .subscribe(function (data) {
            if (data.code === 0) {
                _this.title = data.data.name;
                _this.banner = data.data.banner.path;
                _this.price = data.data.price;
                _this.unit = data.data.unit;
                _this.origin_price = data.data.origin_price;
                _this.origin_price_unit = data.data.origin_price_unit;
                _this.desc = data.data.desc;
                _this.code = data.data.code;
                _this.product = data.data;
            }
            loading.dismiss();
        }, function (error) {
            _this.errorMsg = error;
            console.log(error);
        });
        this.getProductList('', 1)
            .subscribe(function (data) {
            if (data.code == 0) {
                _this.products = data.data.splice(0, 4);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log(error);
        });
    };
    ProductDetailPage.prototype.getProductById = function (id) {
        return this.homeServiceProvider.getProductById(id);
    };
    ProductDetailPage.prototype.getProductList = function (keywords, page) {
        return this.homeServiceProvider.getProductList(keywords, page);
    };
    ProductDetailPage.prototype.goToDetail = function (product) {
        this.navCtrl.push(ProductDetailPage_1, { id: product._id });
    };
    ProductDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ProductDetailPage.prototype.addToCart = function (product) {
        var _this = this;
        if (!this.isLogin) {
            var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            loginModal.present();
            return;
        }
        else {
            if (this.proNum == undefined || this.proNum == 0) {
                this.utilService.showToast(this.toastCtl, '请添加购买的数量');
                return false;
            }
            else {
                var orders_1 = [];
                var order_1 = {};
                order_1.product = product;
                order_1.num = this.proNum;
                orders_1.push(order_1);
                this.storage.get('cart').then(function (cart) {
                    if (cart == null) {
                        // 购物车为空
                        _this.storage.set('cart', orders_1);
                        _this.events.publish('cart:add', orders_1);
                        _this.utilService.showToast(_this.toastCtl, '商品己经成功添加到购物车');
                    }
                    else {
                        // 购物车不为空
                        orders_1 = cart;
                        var isExist = JSON.stringify(cart).indexOf(product._id) != -1;
                        if (!isExist) {
                            // 商品在购物车不存在
                            orders_1.push(order_1);
                            _this.storage.set('cart', orders_1);
                            _this.events.publish('cart:add', orders_1);
                            _this.utilService.showToast(_this.toastCtl, '商品己经成功添加到购物车');
                        }
                        else {
                            _this.utilService.showToast(_this.toastCtl, '购物车中己经存在该商品，无需重复添加');
                        }
                    }
                });
            }
        }
    };
    ProductDetailPage.prototype.buyNow = function (product) {
        var _this = this;
        if (!this.isLogin) {
            var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            loginModal.present();
            return;
        }
        else {
            if (this.proNum == undefined || this.proNum == 0) {
                this.utilService.showToast(this.toastCtl, '请添加购买的数量');
                return false;
            }
            else {
                var orders_2 = [];
                var order = {};
                order.product = product;
                order.num = this.proNum;
                orders_2.push(order);
                this.sum = product.price * this.proNum;
                // 生成订单
                this.orderService.httpPostOrder({
                    products: JSON.stringify(orders_2),
                    sumPrice: this.sum,
                    customer: this.userId
                }).subscribe(function (res) {
                    if (res.code == 0) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__confirm_order_confirm_order__["a" /* ConfirmOrderPage */], {
                            orders: orders_2,
                            sn: res.data.no,
                            no: res.data.sn // 订单编号
                        });
                    }
                });
            }
        }
    };
    ProductDetailPage.prototype.chooseProduct = function (product) {
    };
    ProductDetailPage.prototype.goToCart = function () {
        //选中首页
        var tab = this.navCtrl.parent;
        this.navCtrl.popToRoot();
        tab.select(2);
    };
    ProductDetailPage = ProductDetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-detail',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/product-detail/product-detail.html"*/'<ion-header>\n    <ion-navbar no-border-bottom color="primary">\n        <ion-title>{{title}}</ion-title>\n        <button ion-button clear (click)="dismiss()">\n            <span ion-text showWhen="ios" class="white"></span>\n            <ion-icon name="md-close" showWhen="android" class="white"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-fab top right edge>\n        <button ion-fab color="secondary" (click)="goToCart()"><i class="iconfont icon-cart"></i></button>\n    </ion-fab>\n    <div class="img-box"><img src="{{banner}}" alt="{{title}}" class="pro-img"></div>\n    <h3 class="detail_title">{{title}}</h3>\n    <ion-row>\n        <ion-col item-start class="price">\n            <p>￥<i style="color: red;">{{price}}</i>/{{unit}}</p>\n            <del style="color: #999">￥{{origin_price}}/<span class="f12">{{origin_price_unit}}</span></del>\n        </ion-col>\n        <!--<ion-col icon-end class="buy-num">己有10人购买</ion-col>-->\n    </ion-row>\n    <ion-item>\n        <ion-row>\n            <ion-col class="pro-num-text">购买数量：</ion-col>\n            <ion-col class="pro-num">\n                <num-count [(ngModel)]="proNum" (click)="chooseProduct(product)"></num-count>\n            </ion-col>\n        </ion-row>\n    </ion-item>\n    <h3 class="detail_title">商品描述</h3>\n    <div class="desc">{{desc}}</div>\n    <h3 class="detail_title">猜您喜欢</h3>\n    <div class="products">\n        <ion-grid>\n            <ion-row>\n                <ion-col *ngFor="let product of products;" col-6>\n                    <ion-card (tap)="goToDetail(product)">\n                        <img alt="" width="100%" src="{{product.banner.path}}" height="147"/>\n                        <ion-card-content>\n                            <p class="name">{{product.name}}</p>\n                        </ion-card-content>\n                        <ion-row>\n                            <ion-col>\n                                <p><i style="color: red;">￥{{product.price}}</i>/<span class="f12">{{product.unit}}</span></p>\n                                <del style="color: #999">￥{{product.origin_price}}/<span class="f12">{{product.origin_price_unit}}</span></del>\n                            </ion-col>\n                            <ion-col class="f12 right">\n                                <!--己有0人购买-->\n                            </ion-col>\n                        </ion-row>\n                    </ion-card>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n</ion-content>\n\n<ion-footer>\n    <ion-row>\n        <ion-col item-start col-6>\n            <button ion-button item-end color="dark" class="add-to-cart" (click)="addToCart(product)">加入购物车</button>\n        </ion-col>\n        <ion-col icon-end col-6>\n            <button ion-button item-end color="primary" class="go-pay" (click)="buyNow(product)">立即购买</button>\n        </ion-col>\n    </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/product-detail/product-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_home_service_home_service__["a" /* HomeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__providers_orders_orders__["a" /* OrdersProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ProductDetailPage);
    return ProductDetailPage;
    var ProductDetailPage_1;
}());

//# sourceMappingURL=product-detail.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_validators_validators__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(viewCtrl, utilService, loadingCtrl, toastCtrl, userService, storage, events, fb) {
        this.viewCtrl = viewCtrl;
        this.utilService = utilService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.userService = userService;
        this.storage = storage;
        this.events = events;
        this.fb = fb;
        // 验证码倒计时
        this.verifyCode = {
            verifyCodeTips: "获取验证码",
            countdown: 30,
            disable: true
        };
        this.loginForm = fb.group({
            phone: ['', [__WEBPACK_IMPORTED_MODULE_4__providers_validators_validators__["a" /* ValidatorsProvider */].phone]],
            phoneCode: ['', [__WEBPACK_IMPORTED_MODULE_4__providers_validators_validators__["a" /* ValidatorsProvider */].minNumber]]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    /**
     * 关闭当前页面
     */
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.utilService.showLoading(this.loadingCtrl);
        if (this.loginForm.valid) {
            this.userService.httpPost(this.loginForm.value)
                .subscribe(function (data) {
                if (data.code == 0) {
                    // 本地存储
                    _this.storage.set('user', data.data);
                    // 消息通知
                    _this.events.publish('user:login', data.data, true);
                    _this.utilService.showToast(_this.toastCtrl, '登录成功');
                }
                else {
                    _this.utilService.showToast(_this.toastCtrl, data.msg);
                }
                loading.dismiss();
                _this.dismiss();
            }, function (error) { return _this.showMessage = error; });
        }
    };
    // 倒计时
    LoginPage.prototype.settime = function () {
        var _this = this;
        if (this.verifyCode.countdown == 1) {
            this.verifyCode.countdown = 60;
            this.verifyCode.verifyCodeTips = "获取验证码";
            this.verifyCode.disable = true;
            return;
        }
        else {
            this.verifyCode.countdown--;
        }
        this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
        setTimeout(function () {
            _this.verifyCode.verifyCodeTips = "重新获取(" + _this.verifyCode.countdown + ")";
            _this.settime();
        }, 1000);
    };
    LoginPage.prototype.getCode = function () {
        var _this = this;
        if (this.loginForm.value.phone == '') {
            this.utilService.showToast(this.toastCtrl, '请输入手机号码');
            return;
        }
        //发送验证码成功后开始倒计时
        if (this.verifyCode.disable) {
            this.userService.httpGetVerifyCode(this.loginForm.value.phone).subscribe(function (data) {
                if (data.code == 'OK') {
                    console.log(data);
                }
                else {
                    _this.utilService.showToast(_this.toastCtrl, data.msg);
                }
            });
        }
        this.verifyCode.disable = false;
        this.settime();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/login/login.html"*/'<ion-header>\n    <ion-navbar no-border-bottom color="primary">\n        <ion-title>登录</ion-title>\n        <button ion-button clear (click)="dismiss()">\n            <span ion-text showWhen="ios" class="white">取消</span>\n            <ion-icon name="md-close" showWhen="android" class="white"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <form [formGroup]="loginForm">\n        <ion-list style="margin-top: 100px;">\n            <ion-item>\n                <ion-input type="text" formControlName="phone" placeholder="请输入手机号码"></ion-input>\n                <button class="verify-code" ion-button small item-end [disabled]="!verifyCode.disable"\n                        (click)="getCode()">{{verifyCode.verifyCodeTips}}\n                </button>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" formControlName="phoneCode" placeholder="请输入验证码" maxlength="6"></ion-input>\n            </ion-item>\n            <button ion-button block large [disabled]="!loginForm.valid" (click)="login()" class="login">登 录</button>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pay_pay__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__orders_orders__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_wechat_chenyu__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_orders_orders__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_address_user_address__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_home_service_home_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ConfirmOrderPage = /** @class */ (function () {
    function ConfirmOrderPage(navCtrl, storage, userService, payProvider, utilService, toastCtrl, alertCtrl, wechatChenyu, ordersService, notificationService, homeServiceProvider, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.userService = userService;
        this.payProvider = payProvider;
        this.utilService = utilService;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.wechatChenyu = wechatChenyu;
        this.ordersService = ordersService;
        this.notificationService = notificationService;
        this.homeServiceProvider = homeServiceProvider;
        this.navParams = navParams;
        this.address = null;
        this.sum = 0;
        this.payway = 1;
        this.subject = '';
        this.body = '';
        this.payInfo = '';
        this.hasPay = false;
        this.orders = navParams.get('orders');
        // 商品中途下架
        this.orders.map(function (item) {
            _this.homeServiceProvider.getProductById(item.product._id)
                .subscribe(function (data) {
                if (data.data.pro_status != 0) {
                    _this.utilService.showToast(_this.toastCtrl, data.data.name + '己下架或删除，请重新下单！');
                }
            });
        });
        this.sn = navParams.get('sn');
        this.no = this.navParams.get('no');
    }
    ConfirmOrderPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // 用户信息
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.userId = user._id;
                _this.getDefaultAddress(user._id);
                // this.userService.httpGetUser(user._id).subscribe(
                //     data => {
                //         if (data.code == 0) {
                //             // let userInfo = data.data;
                //             // this.address = userInfo.address;
                //             // this.name = userInfo.name;
                //             // this.phone = userInfo.phone;
                //         }
                //     }
                // )
            }
        });
        // 商家信息
        this.userService.httpGetAdminId().subscribe(function (res) {
            if (res.code == 0) {
                _this.adminId = res.data._id;
                _this.adminPhone = res.data.phone;
            }
        });
        // 计算总价
        var p = 0;
        for (var i = 0; i < this.orders.length; i++) {
            p += (this.orders[i].num ? this.orders[i].num : 0) * this.orders[i].product.price;
            this.subject += this.orders[i].product.name + ' ';
            this.body += this.orders[i].product.name + 'x' + this.orders[i].num + ' ';
        }
        this.sum = p.toFixed(2);
        // 获取支付宝签名字符串
        this.payProvider.postPayInfo({
            subject: this.subject,
            body: this.body,
            outTradeId: this.sn,
            amount: this.sum + '' // 订单总价
        }).subscribe(function (res) {
            if (res) {
                _this.payInfo = res.data.msg;
            }
        });
    };
    ConfirmOrderPage.prototype.getDefaultAddress = function (userId) {
        var _this = this;
        this.userService.getDefaultUserAddress(userId).subscribe(function (res) {
            if (res.code == 0) {
                if (res.data != null) {
                    _this.address = res.data.address;
                    _this.name = res.data.name;
                    _this.phone = res.data.phone;
                    _this.changeAddress(_this.no, res.data._id);
                }
            }
        });
    };
    ConfirmOrderPage.prototype.confirmPay = function () {
        var _this = this;
        var self = this;
        // 商品中途下架
        this.orders.map(function (item) {
            _this.homeServiceProvider.getProductById(item.product._id)
                .subscribe(function (data) {
                console.log(data.data.price != item.product.price, data.data.price, item.product.price);
                if (data.data.pro_status != 0 || data.data.price != item.product.price) {
                    _this.utilService.showToast(_this.toastCtrl, data.data.name + '商品信息己变更，请重新下单！');
                }
                else {
                    if (_this.address == null) {
                        _this.utilService.showToast(self.toastCtrl, '请选择收货地址！');
                    }
                    else {
                        if (_this.payway == 0) {
                            // 支付宝
                            console.log(_this.payInfo);
                            cordova.plugins.alipay.payment(_this.payInfo, function success(e) {
                                console.log(e);
                                //e.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息
                                //e.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success
                                //e.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error
                                //当e.resultStatus为9000时，请去服务端验证支付结果
                                /**
                                 * 同步返回的结果必须放置到服务端进行验证（验证的规则请看https://doc.open.alipay.com/doc2/
                                 * detail.htm?spm=0.0.0.0.xdvAU6&treeId=59&articleId=103665&
                                 * docType=1) 建议商户依赖异步通知
                                 */
                                if (e.resultStatus == 9000) {
                                    // let res = JSON.parse(e.result);
                                    // self.tradeId = res.alipay_trade_app_pay_response.trade_no;
                                    // //验证订单
                                    // self.payProvider.queryOrder(self.sn, self.tradeId).subscribe(res => {
                                    //     self.utilService.alert(res.data.ok);
                                    //     if (res.data.ok) {
                                    //
                                    //     }
                                    // });
                                    // 通知商家发货
                                    var opts = {
                                        content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                                        from: self.userId,
                                        to: self.adminId // 管理员ID
                                    };
                                    self.userOrderNotification(opts);
                                    self.msgToBusiness(self.adminPhone, self.sn);
                                    // 用户收到下单通知
                                    var businessOpts = {
                                        content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                                        from: self.adminId,
                                        to: self.userId
                                    };
                                    self.userOrderNotification(businessOpts);
                                    // 改变订单状态 status=1
                                    self.changeOrderStatus(self.payway);
                                    // 禁用按钮
                                    self.hasPay = true;
                                }
                            }, function error(e) {
                                console.log(e);
                                self.utilService.showToast(self.toastCtrl, e.memo);
                                self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__orders_orders__["a" /* OrdersPage */]);
                                self.hasPay = true;
                            });
                        }
                        else if (_this.payway == 1) {
                            // 微信
                            var params = {
                                attach: self.subject,
                                body: self.body,
                                out_trade_no: self.sn,
                                total_fee: self.sum,
                            };
                            _this.payProvider.postWxPay(params).subscribe(function (res) {
                                if (res.code == 0) {
                                    _this.wechatChenyu.sendPaymentRequest(res.data).then(function (data) {
                                        // 成功之后的跳转
                                        self.utilService.alert(_this.alertCtrl, '支付成功', function () {
                                            // 通知商家发货
                                            var opts = {
                                                content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                                                from: self.userId,
                                                to: self.adminId // 管理员ID
                                            };
                                            self.userOrderNotification(opts);
                                            self.msgToBusiness(self.adminPhone, self.sn);
                                            // 用户收到下单通知
                                            var businessOpts = {
                                                content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                                                from: self.adminId,
                                                to: self.userId
                                            };
                                            self.userOrderNotification(businessOpts);
                                        });
                                        // 改变订单状态 status=1
                                        self.changeOrderStatus(self.payway);
                                        // 获取支付时间
                                        self.changePayDate(self.sn);
                                        // 禁用按钮
                                        self.hasPay = true;
                                    }, function (err) {
                                        self.utilService.showToast(_this.toastCtrl, err);
                                        console.log(err);
                                    });
                                }
                            });
                        }
                    }
                }
            });
        });
    };
    // 改变订单状态
    ConfirmOrderPage.prototype.changeOrderStatus = function (payWay) {
        var _this = this;
        this.ordersService.httpUpdateOrderById(this.no, payWay).subscribe(function (res) {
            if (res.code == 0) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__orders_orders__["a" /* OrdersPage */]);
            }
        });
    };
    // 给用户发送通知
    ConfirmOrderPage.prototype.userOrderNotification = function (opts) {
        this.notificationService.createNotification(opts).subscribe(function (res) {
            if (res.code == 0) {
                console.log('success');
            }
        });
    };
    // 短信通知商家发货
    ConfirmOrderPage.prototype.msgToBusiness = function (phone, sn) {
        this.notificationService.msgToBusiness(phone, sn).subscribe(function (data) {
            if (data.code == 0) {
                console.log('success');
            }
        });
    };
    // 更改收货地址
    ConfirmOrderPage.prototype.changeAddress = function (sn, addressId) {
        this.ordersService.httpChangeAddress(sn, addressId).subscribe(function (data) {
            if (data.code == 0) {
                console.log(data.msg);
            }
        });
    };
    // 更新完成支付时间
    ConfirmOrderPage.prototype.changePayDate = function (sn) {
        this.ordersService.httpChangePayDate(sn).subscribe(function (data) {
            if (data.code == 0) {
                console.log(data.msg);
            }
        });
    };
    ConfirmOrderPage.prototype.selectAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__user_address_user_address__["a" /* UserAddressPage */]);
    };
    ConfirmOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm-order',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/confirm-order/confirm-order.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>确认订单</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item color="primary">\n        <div item-start style="width: 67%;">\n            <p>订单配送至：</p>\n            <p class="address">{{address}}</p>\n            <p>{{name}}&nbsp;&nbsp;&nbsp;&nbsp;{{phone}}</p>\n        </div>\n        <div icon-end>\n            <button ion-button color="primary" (click)="selectAddress()">选择收货地址</button>\n        </div>\n    </ion-item>\n    <ion-list no-padding>\n        <div *ngFor="let product of orders">\n            <ion-item no-padding *ngIf="product.num && product.num > 0">\n                <ion-grid>\n                    <ion-row>\n                        <ion-col col-2><img src="{{product.product.banner.path}}" width="50" height="50"></ion-col>\n                        <ion-col col-10>\n                            <h2 text-left class="product-name">{{product.product.name}}</h2>\n                            <ion-row>\n                                <ion-col class="9">\n                                    <p text-right class="num"><span>x {{(product.num ? product.num : 0)}}</span></p>\n                                </ion-col>\n                                <ion-col col-3>\n                                    <p text-right><i class="price">￥{{((product.num ? product.num : 0) *\n                                        product.product.price).toFixed(2)}}</i>元</p>\n                                </ion-col>\n                            </ion-row>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-item>\n        </div>\n    </ion-list>\n    <ion-item>\n        <p text-right>小计：<span class="price">￥{{sum}}</span>元</p>\n    </ion-item>\n    <div class="pay">\n        <ion-item class="pay-way">\n            <ion-label icon-start color="primary">支付方式</ion-label>\n            <ion-select [(ngModel)]="payway" item-end cancelText="取消" okText="确定">\n                <ion-option value="0">支付宝</ion-option>\n                <ion-option value="1">微信支付</ion-option>\n            </ion-select>\n        </ion-item>\n    </div>\n</ion-content>\n<ion-footer>\n    <ion-row>\n        <ion-col item-start col-8 class="sum" style="background: #222; color: #fff;">\n            合计：<i>￥{{sum}}</i>\n        </ion-col>\n        <ion-col icon-end col-4>\n            <button ion-button item-end color="primary" class="go-pay" (click)="confirmPay()" [disabled]="hasPay">提交订单\n            </button>\n        </ion-col>\n    </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/confirm-order/confirm-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_pay_pay__["a" /* PayProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7_wechat_chenyu__["a" /* WechatChenyu */],
            __WEBPACK_IMPORTED_MODULE_8__providers_orders_orders__["a" /* OrdersProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_home_service_home_service__["a" /* HomeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ConfirmOrderPage);
    return ConfirmOrderPage;
}());

//# sourceMappingURL=confirm-order.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 通知
 */
var NotificationProvider = /** @class */ (function () {
    function NotificationProvider(http, globalConfig) {
        this.http = http;
        this.globalConfig = globalConfig;
    }
    NotificationProvider.prototype.getUserNotificationList = function (userId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.userNotificationList + '?id=' + userId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider.prototype.delUserNotification = function (id, userId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.delUserNotification + '?id=' + id + '&userId=' + userId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider.prototype.readUserNotification = function (id, userId) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.readUserNotification + '?id=' + id + '&userId=' + userId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider.prototype.unReadUserNotification = function (id) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + this.globalConfig.API.unReadUserNotification + '?id=' + id)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider.prototype.createNotification = function (request) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'notification/create/' + request.content + '/' + request.from + '/' + request.to)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider.prototype.msgToBusiness = function (phone, no) {
        return this.http.get(this.globalConfig.APP_SERVE_URL + 'msg_to_business?phone=' + phone + '&no=' + no)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__global_config_global_config__["a" /* GlobalConfigProvider */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_orders_orders__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__confirm_order_confirm_order__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, storage, ordersService, utilService, alertCtrl, toastCtrl, orderService, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.ordersService = ordersService;
        this.utilService = utilService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.orderService = orderService;
        this.navParams = navParams;
        this.orders = [];
        this.storage.get('user').then(function (val) {
            if (val != null) {
                _this.userId = val._id;
                _this.getOrderList();
            }
        });
    }
    OrdersPage.prototype.ngOnInit = function () {
    };
    OrdersPage.prototype.getOrderList = function () {
        var _this = this;
        this.ordersService.httpGetOrderById(this.userId).subscribe(function (res) {
            if (res.code == 0) {
                _this.orders = res.orders;
                _this.orders.map(function (order) {
                    order.products = JSON.parse(order.products);
                    // let arr = [];
                    // order.products.map(product => {
                    //     product.product.orderNum = product.num;
                    //     arr.push(product.product);
                    // });
                    // order.products = arr;
                    if (order.status == 0) {
                        if (order.type == 1) {
                            order.orderStatusText = '己付款，待发货';
                        }
                        else {
                            order.orderStatusText = '待支付';
                        }
                    }
                    else if (order.status == 1) {
                        order.orderStatusText = '己付款，待发货';
                    }
                    else if (order.status == 2) {
                        order.orderStatusText = '己发货';
                    }
                });
            }
        });
    };
    OrdersPage.prototype.delOrder = function (id) {
        var _this = this;
        this.utilService.alert(this.alertCtrl, '确认删除该订单？', function (data) {
            _this.orderService.httpDelOrder(id).subscribe(function (res) {
                if (res.code == 0) {
                    _this.getOrderList();
                    // this.cd.detectChanges(); // 数据更新后，刷新页面
                }
                else {
                    _this.getOrderList();
                    _this.utilService.showToast(_this.toastCtrl, res.msg);
                }
            });
        });
    };
    OrdersPage.prototype.goToPay = function (order) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__confirm_order_confirm_order__["a" /* ConfirmOrderPage */], {
            orders: order.products,
            sn: order.sn,
            no: order._id
        });
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/orders/orders.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>我的订单</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background: #f3f3f3;">\n    <div *ngIf="orders.length == 0" class="no-order">\n        您还没有任何订单～\n    </div>\n    <div *ngIf="orders.length > 0">\n        <ion-card *ngFor="let order of orders">\n            <ion-card-header>\n                <ion-item class="header-item">\n                    <div item-start>{{order.sn}}</div>\n                    <div item-end class="date">{{order.createdAt | date:\'yyyy-MM-dd HH:mm:ss\'}}</div>\n                </ion-item>\n\n            </ion-card-header>\n\n            <ion-card-content>\n                <ion-list>\n                    <ion-item class="list-item" *ngFor="let product of order.products;">\n                        <ion-grid>\n                            <ion-row>\n                                <ion-col col-4><img src="{{ product.product.banner.path }}" height="90"></ion-col>\n                                <ion-col col-8>\n                                    <h2 text-left class="product-name">{{product.product.name}}</h2>\n                                    <div text-right>\n                                        <p><i class="price">￥{{product.product.price}}</i>/<b>{{product.product.unit}}</b></p>\n                                        <del style="color: #999">￥{{product.product.origin_price}}/<span class="f12">{{product.product.origin_price_unit}}</span></del>\n                                    </div>\n                                    <div text-right>x{{product.num}}</div>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </ion-item>\n                </ion-list>\n            </ion-card-content>\n            <ion-item class="order-footer">\n                <div class="status">{{order.orderStatusText}}</div>\n                <div class="sum" item-end>总价 <b class="price">￥{{order.sumPrice.toFixed(2)}}</b></div>\n            </ion-item>\n            <ion-item>\n                <div class="align-right">\n                    <button ion-button class="check-it" *ngIf="order.status == 0" (click)="goToPay(order)">继续支付</button>\n                    <button ion-button float-right class="check-it" (click)="delOrder(order._id)">删除</button>\n                </div>\n            </ion-item>\n        </ion-card>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/orders/orders.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_orders_orders__["a" /* OrdersProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_orders_orders__["a" /* OrdersProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__address_address__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util_service_util_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the UserAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserAddressPage = /** @class */ (function () {
    function UserAddressPage(navCtrl, navParams, loadingCtrl, utilService, toastCtrl, userService, viewCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.utilService = utilService;
        this.toastCtrl = toastCtrl;
        this.userService = userService;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.user = user;
            }
        });
    }
    UserAddressPage.prototype.ngOnInit = function () {
    };
    UserAddressPage.prototype.ionViewDidEnter = function () {
        this.getAdderss();
    };
    UserAddressPage.prototype.addAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__address_address__["a" /* AddressPage */], { user: this.user });
    };
    UserAddressPage.prototype.getAdderss = function () {
        var _this = this;
        var loading = this.utilService.showLoading(this.loadingCtrl, '保存中...');
        this.userService.getHttpUserAddress(this.user._id).subscribe(function (data) {
            if (data.code === 0) {
                loading.dismiss();
                _this.address = data.data;
            }
        });
    };
    UserAddressPage.prototype.changeDefault = function (val) {
        var _this = this;
        this.userService.changeUserDefaultAddress(this.user._id, val).subscribe(function (data) {
            if (data.code === 0) {
                _this.utilService.showToast(_this.toastCtrl, '您己更改收货地址！');
                _this.address = data.data;
                _this.viewCtrl.dismiss();
            }
        });
    };
    UserAddressPage.prototype.changeAddress = function (id) {
        var that = null;
        this.address.map(function (adr) {
            if (adr._id == id) {
                that = adr;
            }
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__address_address__["a" /* AddressPage */], { address: that });
    };
    UserAddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-address',template:/*ion-inline-start:"/Users/hwl/work/cordova/niu_app/src/pages/user-address/user-address.html"*/'<ion-header>\n    <ion-navbar color="primary" no-border-bottom>\n        <ion-title>收货地址</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n        <div *ngFor="let ad of address" class="address-item">\n            <!--<div item-start><ion-checkbox color="primary" checked="{{ad.is_default == 1}}" (ionChange)="changeDefault($event)"></ion-checkbox></div>-->\n            <div class="address">{{ad.address}}</div>\n            <ion-item>\n                <div item-end>\n                    <button ion-button color="light" (click)="changeAddress(ad._id)">修改</button>\n                </div>\n                <div item-end>\n                    <button ion-button color="primary" *ngIf="ad.is_default == 1" (click)="changeDefault(ad._id)">默认收货地址</button>\n                    <button ion-button color="light" *ngIf="ad.is_default == 0" (click)="changeDefault(ad._id)">默认收货地址</button>\n                </div>\n            </ion-item>\n        </div>\n    </ion-list>\n</ion-content>\n\n<ion-footer padding style="border-top: 1px #f2f2f2 solid;">\n    <button ion-button full color="primary" (click)="addAddress()">新增收货地址</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/hwl/work/cordova/niu_app/src/pages/user-address/user-address.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_util_service_util_service__["a" /* UtilServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], UserAddressPage);
    return UserAddressPage;
}());

//# sourceMappingURL=user-address.js.map

/***/ })

},[274]);
//# sourceMappingURL=main.js.map