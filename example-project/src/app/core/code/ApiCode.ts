export enum ApiCode {
    AI001, // _AppVersionCheck           = 'AI001', // APP Version 체크
    AI002, // _CodeList                  = 'AI002', // Code List
    AI003, //                            = 'AI003', // Counselor Login
    AI007, // _PersonalinfoMation        = 'AI007', // 개인정보 취급방침
    AI008, // _ServiceClause             = 'AI008', // 서비스 이용약관
    AI010, //  = 'AI010', // 기 회원정보 확인 	핸드폰번호+생년월일 정보로 통합회원 정보 존재여부 조회
    AI021, //  = 'AI021', // Counselor Access Token 갱신	상담사 로그인 후 부여받은 Refresh Token으로 Access Token을 갱신 함
    AI022, //  = 'AI022', // Counselor Access Token 조회	상담사 Access Token 만료 여부 조회
    AI025, // _PersonalLogin = 'AI025', // mindCare 개인화 APP 로그인	핸드폰번호 or 핸드폰 뒷 자리만 가지고 간편 로그인
    AI026, //  = 'AI026', // Counselor Login	상담사 로그인 처리(SVC_ID없이가능)
    AI027, //  = 'AI027', // 대기모드 정보	대기모드 정보
    AI028, //  = 'AI028', // 외부 회원인증	대구TP
    AI029, //  = 'AI029', // 외부 회원가입	대구TP
    AI040, //  = 'AI040', // 외부 회원가입	중앙대
    AI041, //  = 'AI041', // 상담사 비밀번호 변경	외부연동 상담사 비밀번호 변경
    AI042, //  = 'AI042', // 마음나래 상담신청 이메일 발송	법무부 EAP 마음나래
    AI201, //  = 'AI201', // 내담자 등록	회원 가입처리
    AI202, //  = 'AI202', // 내담자 정보 수정	내담자 개인정보 수정처리
    AI203, //  = 'AI203', // 내담자 정보삭제	내담자 정보삭제 처리 (회원탈퇴 처리)
    AI204, //  = 'AI204', // 가족관계 등록/수정	가족관계 등록/수정
    AI205, //  = 'AI205', // 사전설문지 등록/수정	사전설문지 등록/수정
    AI240, //  = 'AI240', // 외부연동 내담자 등록	회원가입처리
    AI301, //  = 'AI301', // 디바이스 연결	디바이스 연결정보 연동 (Lock 처리된 디바이스 연동 불가 처리 필요)
    AI302, //  = 'AI302', // 설문/검사템플릿,항목 조회	설문/검사 템플릿, 항목 조회 (내담자 등록 시 사전상담지 포함)
    AI303, //  = 'AI303', // 설문/검사항목 조회	설문/검사문항 문제유형 및 문항/답변 조회
    AI304, //  = 'AI304', // 설문/검사결과 등록	설문/검사결과 등록
    AI306, //  = 'AI306', // 뇌파 측정결과 등록	뇌파 측정결과 등록
    AI308, //  = 'AI308', // 맥파 측정결과 등록	맥파 측정결과 등록
    AI310, //  = 'AI310', // 측정결과 이메일,SMS 발송	측정결과 이메일,SMS 발송
    AI311, // _MEAS_PULSE = 'AI311', // 맥파 측정결과 (개인화 APP 대응용)	맥파 측정결과 제공 (user_id 단위)
    AI312, // _MEAS_NEURO = 'AI312', // 뇌파 측정결과 (개인화 APP 대응용)	뇌파 측정결과 제공 (user_id 단위)
    AI313, //  = 'AI313', // 측정 평균	측정 평균
    AI314, //  = 'AI314', // 컨텐츠 이용	VR
    AI315, //  = 'AI315', // 내담자 측정이력 조회(외부연동)	인증절차없음(SVC_ID기준)
    AI316, //  = 'AI316', // 측정 번호 받기(감정노동자)	측정 번호 받기(감정노동자)
    AI317, //  = 'AI317', // VR 임시회원 추가	VR
    AI401, //  = 'AI401' // 서버 데이터 내려받기	서버 데이터 내려받기 (내담자 > 사전설문지 > 측정데이터 순으로 동기화)

}

// export namespace ApiCode {
//     export function doSomething(code: ApiCode): {name: string, age: number} {
//         if (ApiCode.AI001_AppVersionCheck === code) {
//             //
//         };
//         return {name: '1', age: 2};
//     }
// }
