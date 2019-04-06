import {ResponseBody} from './ResponseBody';
import {AI302Question} from './AI302Question';

export class AI302RschItem implements ResponseBody {
    item_cd: string; // 항목 코드	x	200byte	x
    sort: string; // 순서	x	200byte	x
    titl: string; // 제목	x	200byte	x
    answer_type: string; // 객/주관식 구분	x	200byte	x
    multichos_cl: string; // 다중선택	x	200byte	x
    cols: string; // 컬럼	x	200byte	x
    type_cd: string; // 유형 코드 VARCHAR2(5 BYTE)
    type_tot_grd: number; // 유형 총 점수 NUMBER
    question_item_arr: Array<AI302Question>;	// 설문지정보 배열
}
