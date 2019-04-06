import {RequestHwayou} from './RequestHwayou';
import {MethodCode} from '../../code/MethodCode';

export class CheckRequest implements RequestHwayou {
    code_service: string;
    user_id: string;

    getPath(): string {
        return 'auth/check';
    }
    getMethod(): MethodCode {
        return MethodCode.POST;
    }
}
