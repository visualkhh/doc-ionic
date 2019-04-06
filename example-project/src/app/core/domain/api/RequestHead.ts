import {ApiCode} from '../../code/ApiCode';

export class RequestHead {
    api_code: ApiCode;           // api_code				전문코드				O	5byte	X
    svc_id: string;             // SVC_ID				서비스코드				O	6byte	X
    corp_id: string;            // DCORP_ID				업체코드				O	8byte	X
    admin_lgin_id: string;      // ADMIN_LGIN_ID			상담사 로그인 ID			X	20byte	O
    admin_access_token: string; // ADMIN_ACCESS_TOKEN	ADMIN_ACCESS_TOKEN	X	300byte	X
    user_lgin_id: string;       // USER_LGIN_ID			사용자 로그인 ID			X	20byte	O
    access_token: string;       // ACCESS_TOKEN			USER_ACCESS_TOKEN	X	300byte	X
    phone_mac_add: string;      // RPHONE_MAC_ADDR		PHONE MAC 주소		X	40byte	O
    phone_model: string;        // PHONE_MODEL			PHONE 모델명			X	40byte	O
    os_version: string;         // OS_VERSION			PHONE OS 버전			X	20byte	O
    user_id: string;            // USER_ID			일반회원 내부 고유ID			X	12byte	O
    svc_ctg_id: string;         // 서비스 카테고리 아이디			X	6byte	X
    svc_ctg_type: string;       // 서비스 카테고리 타입			X	5byte	X
    app_package_name: string;   // 앱 패키지명
    app_version: string;        // 앱 버전
}
