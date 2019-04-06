import {RequestBody} from './RequestBody';
import {OSType} from '../../type/OSType';
import {ApiCode} from '../../code/ApiCode';

// APP Version 체크
export class AI001Request implements RequestBody {
    public os_type: OSType;


    constructor(os_type: OSType) {
        this.os_type = os_type;
    }

    getApiCode(): ApiCode {
        return ApiCode.AI001;
    }
}
