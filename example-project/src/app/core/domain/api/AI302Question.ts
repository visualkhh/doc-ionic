import {ResponseBody} from './ResponseBody';

export class AI302Question implements ResponseBody {
    question_item_cd: string; // 문항코드	x	200byte	x
    sort: string; // 순서	x	200byte	x
    content: string; // 내용	x	200byte	x
    type: string; // 타입	x	200byte	x
    grd: string; // 점수	x	200byte	x
}
