import {ResponseBody} from './ResponseBody';


export class AI025Response implements ResponseBody {

    user_id: string;
    // @Encrypt(PrivacyEncryptor.class)
    user_nm: string;
    // @Encrypt(PrivacyEncryptor.class)
    phone: string;
    // @Encrypt(PrivacyEncryptor.class)
    birthday: string;
    // @Encrypt(PrivacyEncryptor.class)
    email: string;
    svc_id: string;
    gender: string;
    job: string;
    // @Encrypt(PrivacyEncryptor.class)
    job_nm: string;
    local_group: string;
    access_token: string; 	// access_token	o	300byte	x
    refresh_token: string; 	// refresh_token	o	300byte	x
    token_expire: string; 	// access_token 만료일	o	 14byte	x
}
