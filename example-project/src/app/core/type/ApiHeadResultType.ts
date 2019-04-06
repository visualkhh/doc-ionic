
export enum ApiHeadResultType {
    CODE_SUCCESS = '00000', // 성공
    CODE_VALIDATE_FAIL = 'M1013', //  validate 오류
    CODE_JSON_PARSE_FAIL = 'M1014', //  파라미터 json 파싱 오류
    CODE_EMPTY_DATA = 'M3001', //  요청 정보가 존재하지 않을 때
    CODE_PARAM_FAILE = 'M1001', //  요공통 필수 입력정보 부족
    CODE_PARAM_NOT_WELL_FORMED = 'M1015', //  파라미터 형식이 바르지 못함.

    CODE_CREATE_UNIQ_DUP = 'M4008', //  중복된 유일값입니다.
    CODE_CREATE_FAIL = 'M4009', //  반영 실패하였습니다.

    // 인증
    CODE_ACCESS_TOKEN_FAIL = 'M2001', // 다시 로그인하여 주십시오.	access_token 인증 실패
    CODE_ACCESS_TOKEN_EXPIRED = 'M2002', // 다시 로그인하여 주십시오.	access_token 기간만료
    CODE_REFRESH_TOKEN_FAIL = 'M2003', // 다시 로그인하여 주십시오.	refresh_token 인증 실패
    CODE_NOT_EXIST_ID = 'M2006', // 일치하는 회원정보가 없습니다.	ID가 존재하지 않음.
    CODE_AUTH_PASSWORD_FAIL = 'M2007', // 일치하는 회원정보가 없습니다.	PW가 일치하지 않음.
    CODE_AUTH_LOCK = 'M2015', // 로그인 실패로 잠금처리 되었습니다.	로그인 실패에 다른 일정 시간 로그인 잠금 처리 됨
    CODE_AUTH_FAIL_LOCK = 'M2016', // 로그인 실패 횟수를 초과했습니다.	로그인 실패횟수 초과에 따른 로그인 Lock처리

    // 정보조회
    CODE_SELECT_NOT_EXIST = 'M3001', // 요청하신 정보가 존재하지 않습니다.	요청 정보가 존재하지 않을 때
    CODE_UDATE_FAIL = 'M3011', // 처리 중 오류가 발생하였습니다.	DB 업데이트가 0건 됨.
    CODE_DEVICE_STAT_FAIL = 'M3012', // 등록이 불가능한 디바이스입니다.	디바이스 연결 시 분실/중지/삭제의 경우 연결 실패
    CODE_DEVICE_DUX_FAIL = 'M3013', // 다른 사용자가 사용중인 디바이스입니다.	1:1매칭타입 디바이스이나 타인 사용중으로 연결 실패
    CODE_DEVICE_AUTH_FAIL = 'M3014', // 디바이스 정보가 바르지 않습니다.	MAC 또는 시리얼번호가 바르지 않습니다.
    CODE_FILE_NOTFOUND_READ_M3015 = 'M3015', // 파일을 찾을수 없습니다.
    CODE_ALREADY_TEMINATION = 'M3016', // 이미 탈퇴처리 되어 있습니다.	이미 탈퇴처리 되어 있습니다.
    CODE_NOT_EXIST_SVC_ID = 'M3017', // 존재하지 않는 서비스입니다.	일치하는 SVC_ID가 존재하지 않음.

    // 정보추가
    CODE_MEMBER_DUPLICATION = 'M4010', // 이미 내담자 등록이 되어 있습니다.	내담자 등록정보 데이터가 존재합니다.
    CODE_ID_DUPLICATION = 'M4011', // 중복되는 로그인ID가 존재합니다.	Ring 회원가입 시 중복아이디가 존재 시
    CODE_MEMBER_RING_DUPLICATION = 'M4012', //  이미 회원 가입이 되어 있습니다.	동일 서비스에 가입이력이 존재 함
    CODE_DIFFER_ID = 'M4013', //  통합계정 아이디가 존재합니다.	입력 ID와 기존 DB_ID가 상이 함.

    //  시스템
    CODE_ENC_PWD_ERROR = 'M7002', // 다시 접속하여 주십시오.	encryptPassword 처리 중 Exception 발생

    // DB
    CODE_DB_DELAY = 'M6001',  // 	접속이 지연되고 있습니다.	DB 연결 실패
    CODE_DB_SQL_ERROR = 'M6002',  // 	SQL 예외 오류 발생 하였습니다.	SQL 예외 오류 발생

    CODE_ENCRYPT_ERROR = '98001', //  암호화오류
    CODE_ERROR = '99999'//  알수없는에러
}
