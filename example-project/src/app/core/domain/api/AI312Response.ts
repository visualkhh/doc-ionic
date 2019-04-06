import {ResponseBody} from './ResponseBody';
import {AI312ResponseData} from './AI312ResponseData';

// neuro
export class AI312Response implements ResponseBody {
    list: Array<AI312ResponseData>;
}
