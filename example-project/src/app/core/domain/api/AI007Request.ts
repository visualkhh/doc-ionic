import {RequestBody} from './RequestBody';
import { ApiCode } from '../../code/ApiCode';
// CodeList
export class AI007Request implements RequestBody {

    getApiCode(): ApiCode {
        return ApiCode.AI007;
    }
}
