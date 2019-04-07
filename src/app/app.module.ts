import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GlobalConfigProvider} from '../providers/global-config/global-config';
import {HomeServiceProvider} from '../providers/home-service/home-service';
import {NativeProvider} from '../providers/native/native';
import {NotificationProvider} from '../providers/notification/notification';
import {OrdersProvider} from '../providers/orders/orders';
import {UserProvider} from '../providers/user/user';
import {UtilServiceProvider} from '../providers/util-service/util-service';
import {ValidatorsProvider} from '../providers/validators/validators';
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {ProductListPage} from "../pages/product-list/product-list";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {NotificationPage} from "../pages/notification/notification";
import {CartPage} from "../pages/cart/cart";
import {OrdersPage} from "../pages/orders/orders";
import {NamePage} from "../pages/name/name";
import {AddressPage} from "../pages/address/address";
import {VersionPage} from "../pages/version/version";
import {AppVersion} from "@ionic-native/app-version";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {FileTransfer} from "@ionic-native/file-transfer";
import {HttpModule} from "@angular/http";
import {File} from '@ionic-native/file';
import {ComponentsModule} from "../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmOrderPage} from "../pages/confirm-order/confirm-order";
import {PayProvider} from '../providers/pay/pay';
import {WechatChenyu} from "wechat-chenyu";
import {UpdateProvider} from '../providers/update/update';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Diagnostic} from "@ionic-native/diagnostic";
import {FileOpener} from "@ionic-native/file-opener";
import {UserAddressPage} from "../pages/user-address/user-address";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage,
        ProductListPage,
        ProductDetailPage,
        NotificationPage,
        CartPage,
        OrdersPage,
        NamePage,
        AddressPage,
        AboutPage,
        VersionPage,
        ConfirmOrderPage,
        UserAddressPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        ComponentsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',              //重置back文案
            tabsHideOnSubPages: 'true',         //隐藏全部子页面tabs
            mode: 'ios'                         //把所有平台设置为iOS风格
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage,
        ProductListPage,
        ProductDetailPage,
        NotificationPage,
        CartPage,
        OrdersPage,
        NamePage,
        AddressPage,
        AboutPage,
        VersionPage,
        ConfirmOrderPage,
        UserAddressPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GlobalConfigProvider,
        HomeServiceProvider,
        NativeProvider,
        NotificationProvider,
        OrdersProvider,
        UserProvider,
        AppVersion,
        UtilServiceProvider,
        ValidatorsProvider,
        Camera,
        ImagePicker,
        FileTransfer,
        File,
        ComponentsModule,
        OrdersProvider,
        PayProvider,
        WechatChenyu,
        UpdateProvider,
        InAppBrowser,
        Diagnostic,
        FileOpener
    ]
})
export class AppModule {
}
