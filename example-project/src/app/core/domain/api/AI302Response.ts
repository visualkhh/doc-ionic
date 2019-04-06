import {ResponseBody} from './ResponseBody';
import {AI302Tmpl} from './AI302Tmpl';

// 설문/검사 템플릿 항목
export class AI302Response implements ResponseBody {
    tmpl_info_arr: Array<AI302Tmpl>; // 템플릿
}
