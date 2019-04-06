import {ResponseBody} from './ResponseBody';
import {AI302RschInfo} from './AI302RschInfo';

export class AI302Tmpl implements ResponseBody {
    tmpl_cd: string; // 템플릿코드	O	5byte	X
    tmpl_description: string; // 템플릿설명	X	4000byte	X
    rsch_info_arr: Array<AI302RschInfo>; // 설문지정보 배열
}
