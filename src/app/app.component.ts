import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {UtilServiceProvider} from "../providers/util-service/util-service";
import {GlobalConfigProvider} from "../providers/global-config/global-config";
import {UpdateProvider} from "../providers/update/update";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public utilService: UtilServiceProvider,
                public updateService: UpdateProvider,
                public globalConfig: GlobalConfigProvider) {
        this.platform.ready().then(() => {
            if (this.globalConfig.IS_DEBUG) {
                this.utilService.alloyLeverInit(); // 本地"开发者工具"
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // 注意（重点）：在平台准备好后再加载插件，否则会报错
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.updateService.checkVersion(); // 版本升级检测
        });
    }
}
