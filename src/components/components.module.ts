import {NgModule} from '@angular/core';
import {NumCountComponent} from './num-count/num-count';
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [NumCountComponent],
    imports: [IonicModule],
    exports: [NumCountComponent]
})
export class ComponentsModule {
}
