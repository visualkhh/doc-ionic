import {RequestBody} from './RequestBody';
import {ApiCode} from '../../code/ApiCode';
import {RschTmplType} from '../../type/RschTmplType';

// 설문/검사템플릿 항목 조회
export class AI302Request implements RequestBody {
    tmpl_info_arr: Array<RschTmplType>;
    getApiCode(): ApiCode {
        return ApiCode.AI302;
    }
}
