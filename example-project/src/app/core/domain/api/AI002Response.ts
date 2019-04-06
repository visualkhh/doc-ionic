import {ResponseBody} from './ResponseBody';

export class AI002ResponseCtg {
    cd_ctg: string;
    cd_ctg_nm: string;
}
export class AI002ResponseGrp {
    cd_grp: string;
    cd_grp_nm: string;
    cd_arr: Array<AI002ResponseCD>;
}
export class AI002ResponseCD {
    cd: string;
    cd_nm: string;
    cd_desc: string;
    cd_sort: number;
}
export class AI002Response implements ResponseBody {
    code_ver: string;
    cd_cgt_arr: Array<AI002ResponseCtg>;
}
