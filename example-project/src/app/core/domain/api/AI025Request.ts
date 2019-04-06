import {RequestBody} from './RequestBody';
import {ApiCode} from '../../code/ApiCode';

// 마인드케어 개인화 앱 로그인 처리용
export class AI025Request implements RequestBody {
    public phone: string;
    public birthday: string;
    public zero_phone: string;
    public svc_id: string;

    getApiCode(): ApiCode {
        return ApiCode.AI025;
    }
}
