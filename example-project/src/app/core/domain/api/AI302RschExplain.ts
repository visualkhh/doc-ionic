import {ResponseBody} from './ResponseBody';

export class AI302RschExplain implements ResponseBody {
    explain_titl: string; // EXPLAIN_TITL
    result_cd: string; // RESULT_CD
    explain_smry: string; // EXPLAIN_SMRY
    explain_content: string; // EXPLAIN_CONTENT
    explain_tip: string; // EXPLAIN_TIP
    smry_exist_yn: string; // SMRY_EXIST_YN
    regdate: string; // REGDATE
    upddttm: string; // UPDDTTM
    explain_advice: string; // EXPLAIN_ADVICE
    rsch_cd: string; // RSCH_CD
    start_grd: string; // START_GRD
    end_grd: string; // END_GRD
    filenm: string; // FILENM
    down_url: string; // DOWN_URL
    result_type: string; // RESULT_TYPE
}
