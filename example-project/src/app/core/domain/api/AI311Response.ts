import {ResponseBody} from './ResponseBody';
import {AI311ResponseData} from './AI311ResponseData';

// 맥파
export class AI311Response implements ResponseBody {
    list: Array<AI311ResponseData>;
}
