import {ResponseBody} from './ResponseBody';
import {AI302RschItem} from './AI302RschItem';
import {AI302RschExplain} from './AI302RschExplain';

export class AI302RschInfo implements ResponseBody {
    rsch_cd: string; // 설문지코드	o	5byte	x
    titl: string; // 설문지명	x	200byte	x
    description: string; // 설문지설명	x	4000byte	x
    rsch_guide: string; // --검사안내
    rsps_time: string; // --응답시분초 ex)000510
    tgt_cd: string; // --검사 대상코드


    rsch_item_arr: Array<AI302RschItem>;	    // 설문지정보 배열
    rsch_explain_arr: Array<AI302RschExplain>; // 설문지 해설 배열
}
