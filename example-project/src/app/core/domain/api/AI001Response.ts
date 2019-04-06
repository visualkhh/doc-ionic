import {AI001DataLastVer} from './AI001DataLastVer';
import {ResponseBody} from './ResponseBody';


export class AI001Response implements ResponseBody {
    app_update_type: string;                // 강제 업데이트 여부
    os_type: string;                        // OS 구분
    ver_info: string;                       // VERSION 정보
    app_desc: string;                       // APP 소개내용
    app_down_url: string;                   // 마켓 다운로드 URL
    data_last_ver: Array<AI001DataLastVer>; // 데이터 구분 배열
}
