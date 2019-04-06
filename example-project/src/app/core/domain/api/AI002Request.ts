import {RequestBody} from './RequestBody';
import { ApiCode } from '../../code/ApiCode';
// CodeList
export class AI002Request implements RequestBody {

    getApiCode(): ApiCode {
        return ApiCode.AI002;
    }
}
