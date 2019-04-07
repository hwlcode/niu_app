import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

/**
 * 验证
 */
@Injectable()
export class ValidatorsProvider {
    constructor() {

    }

    /*E-mail*/
    // static email = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('email', control, '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
    // }

    /*手机号码*/
    static phone = (control: FormControl) => {
        const val = (control.value || '') + '';
        const reg = /^1[34578]\d{9}$/;
        const valid = reg.test(val);
        return valid ? null : {phoneValidator: true};
    }

    /*中文*/
    // static chinese = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
    // }

    /*英文、数字包括下划线*/
    // static legallyNamed = (control: AbstractControl) => {
    //     return ValidatorsProvider.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
    // }

    /*5~6位短信验证码*/
    static minNumber = (control: FormControl) => {
        const val = (control.value || '') + '';
        const reg = /^\d{5,6}$/;
        const valid = reg.test(val);
        return valid ? null : {numberValidator: true};
    }

    // private static validatorsByPattern = (name: string, control: AbstractControl, pattern: string) => {
    //     const validatorFn = Validators.pattern(pattern)(control);
    //     if (validatorFn != null) {
    //         validatorFn[name] = validatorFn['pattern'];
    //     }
    //     return validatorFn;
    // }
}
