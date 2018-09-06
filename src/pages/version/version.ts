import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NativeProvider} from "../../providers/native/native";

@IonicPage()
@Component({
    selector: 'page-version',
    templateUrl: 'version.html',
})
export class VersionPage {
    versionNumber;

    constructor(public navCtrl: NavController,
                public nativeService: NativeProvider) {
    }

    ionViewDidLoad() {
        this.nativeService.getVersionNumber().subscribe(
            val => {
                if (val != null) {
                    this.versionNumber = val;
                }
            },
            error => {
                console.log(error);
            }
        )
    }

}
