import {RequestBody} from './RequestBody';
import {ApiCode} from '../../code/ApiCode';

// 측정데이터 맥
export class AI311Request implements RequestBody {
    user_id: string; // 유저 아이디
    date: string;	// date (형식 : YYYYMMDDHH24MISS)

    constructor(user_id: string, date: string) {
        this.user_id = user_id;
        this.date = date;
    }

    getApiCode(): ApiCode {
        return ApiCode.AI311;
    }
}
