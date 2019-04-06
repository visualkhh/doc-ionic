import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {UserDetail} from '../domain/UserDetail';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/src/internal/Observable';
import {init} from 'protractor/built/launcher';
import {ApiService} from './api.service';
import {AI025Request} from '../domain/api/AI025Request';
import {AES256Crypto} from '../security/AES256Crypto';
import {AI025Response} from '../domain/api/AI025Response';
import {AI311ResponseData} from '../domain/api/AI311ResponseData';
import {AI311Response} from '../domain/api/AI311Response';
import {AI311Request} from '../domain/api/AI311Request';
import {AI312Response} from '../domain/api/AI312Response';
import {AI312Request} from '../domain/api/AI312Request';
import {UserMeasNeuro} from '../domain/UserMeasNeuro';
import {UserMeasPulse} from '../domain/UserMeasPulse';
import {Survey} from '../domain/survey/Survey';
import {ContentsService} from './contents.service';
// import * from 'aes256';
// const aes256 = require('aes256');
const defaultUser = {
    user_nm: 'Guest',
    login: false,
    autoLogin: false
} as UserDetail;

@Injectable()
export class UserService {

    readonly userDetailKey = 'userDetail';
    readonly userMeasPulseKey = 'userMeasPulse';
    readonly userMeasNeuroKey = 'userMeasNeuro';
    readonly userSuervyKey = 'userSurvey';
    private statusUserDetailSubject = new BehaviorSubject<UserDetail>(defaultUser);
    private statusMeasPulseSubject = new BehaviorSubject<UserMeasPulse[]>([]);
    private statusMeasNeuroSubject = new BehaviorSubject<UserMeasNeuro[]>([]);
    private statusSurveyubject = new BehaviorSubject<Survey[]>([]);

    constructor(private storage: Storage, private apiSercice: ApiService, private router: Router) {
        console.log('UserService con');
        this.init();
    }

    async init() {
        let userDeatil = await this.getUserDetail();
        if (!userDeatil || !userDeatil.autoLogin) {
            userDeatil = await this.deleteUserAllData();
        }
        this.nextUserDetail(userDeatil);

        if (userDeatil.login) {
            this.syncUserMeas(userDeatil.user_id);
        }
        this.syncUserSurvey(userDeatil);

    }

    async syncUserMeas(user_id?: string) {
        user_id = user_id || (await this.getUserDetail()).user_id;
        this.apiSercice.getApi<AI311Response>(new AI311Request(user_id, '0')).toPromise()
            .then(mit => this.storage.set(this.userMeasPulseKey, mit.list))
            .then(mit => this.nextUserMeasPulse(mit));
        this.apiSercice.getApi<AI312Response>(new AI312Request(user_id, '0')).toPromise()
            .then(mit => this.storage.set(this.userMeasNeuroKey, mit.list))
            .then(mit => this.nextUserMeasNeuro(mit));
    }
    async syncUserSurvey(data: UserDetail) {
        this.storage.get(await this.getUserSurvyKey(data)).then(it => this.nextUserSurvey(it));
    }

    public getUserDetail(): Promise<UserDetail> {
        return this.storage.get(this.userDetailKey).then((it: UserDetail) => it ? Object.assign(new UserDetail(), it) : it);
    }

    public getUserMeasPulse(): Promise<UserMeasPulse[]> {
        return this.storage.get(this.userMeasPulseKey).then((it: UserMeasPulse[]) => {
            for (let i = 0; it && i < it.length; i++) {
                it[i] = Object.assign(new UserMeasPulse, it[i]);
            }
            return it;
        });
    }

    public getUserMeasNeuro(): Promise<UserMeasNeuro[]> {
        return this.storage.get(this.userMeasNeuroKey).then((it: UserMeasNeuro[]) => {
            for (let i = 0; it && i < it.length; i++) {
                it[i] = Object.assign(new UserMeasNeuro, it[i]);
            }
            return it;
        });
    }

    public setUserDetail(userDeatil: UserDetail): Promise<UserDetail> {
        return this.storage.set(this.userDetailKey, userDeatil);
    }
    async deleteUserAllData(): Promise<UserDetail> {
        // const userData = await this.getUserDetail();
        // const key = await this.getUserSurveyKey();
        // this.storage.remove(key);
        this.storage.remove(this.userDetailKey);
        this.storage.remove(this.userMeasPulseKey);
        this.storage.remove(this.userMeasNeuroKey);
        return this.storage.set(this.userDetailKey, defaultUser);
    }

    public async login(birthday: string, phone: string, autoLogin = false): Promise<UserDetail> {
        const ai025 = new AI025Request();
        ai025.birthday = new AES256Crypto().encode(birthday);
        ai025.phone = new AES256Crypto().encode(phone);
        ai025.zero_phone = new AES256Crypto().encode('0100000' + phone.substr(phone.length - 4, 4));
        // this.apiSercice.getApi<AI025Response>(ai025).subscribe(it => {
        //     console.log(it);
        //     const userDetail = Object.assign(new UserDetail(), it);
        //     userDetail.login = true;
        //     userDetail.user_nm = new AES256Crypto().decode(it.user_nm);
        //     this.storage.set(this.userDetailKey, userDetail);
        // });
        // const it = await this.apiSercice.getApi<AI025Response>(ai025).toPromise();
        return this.apiSercice.getApi<AI025Response>(ai025).flatMap(it => {
            const userDetail = Object.assign(new UserDetail(), it) as UserDetail;
            userDetail.login = true;
            userDetail.user_nm = new AES256Crypto().decode(it.user_nm);
            userDetail.autoLogin = autoLogin;
            return this.storage.set(this.userDetailKey, userDetail);
        }).map((it: UserDetail) => {
            this.nextUserDetail(it);
            return it;
        }).map((it: UserDetail) => {  // meas
            this.syncUserSurvey(it);
            this.syncUserMeas(it.user_id);
            // this.apiSercice.getApi<AI311Response>(new AI311Request(it.user_id, '0')).toPromise()
            //     .then(mit => this.storage.set(this.userMeasPulseKey, mit.list))
            //     .then(mit => this.nextUserMeasPulse(mit));
            // this.apiSercice.getApi<AI312Response>(new AI312Request(it.user_id, '0')).toPromise()
            //     .then(mit => this.storage.set(this.userMeasNeuroKey, mit.list))
            //     .then(mit => this.nextUserMeasNeuro(mit));
            return it;
        }).toPromise();
        // const userDetail = Object.assign(new UserDetail(), it);
        // userDetail.login = true;
        // userDetail.user_nm = new AES256Crypto().decode(it.user_nm);
        // return this.storage.set(this.userDetailKey, userDetail);
        // this.statusSubject.next(defaultUser);
    }

    async logOut() {
        const duser = await this.deleteUserAllData();
        this.nextUserDetail(duser);
        this.syncUserSurvey(duser);
        return defaultUser;
        // location.href = '/';
        // this.router.navigate(['/'], {queryParams: {refresh: new Date().getTime()}});
    }

    private nextUserDetail(data: UserDetail) {
        this.statusUserDetailSubject.next(Object.assign(new UserDetail(), data));
    }

    private nextUserMeasPulse(data: UserMeasPulse[]) {
        const arr = new Array<UserMeasPulse>();
        for (let i = 0; data && i < data.length; i++) {
            arr.push(Object.assign(new UserMeasPulse(), data[i]));
        }
        this.statusMeasPulseSubject.next(arr);
    }
    private nextUserMeasNeuro(data: UserMeasNeuro[]) {
        const arr = new Array<UserMeasNeuro>();
        for (let i = 0; data && i < data.length; i++) {
            arr.push(Object.assign(new UserMeasNeuro(), data[i]));
        }
        this.statusMeasNeuroSubject.next(arr);
    }

    private nextUserSurvey(data: Survey[]) {
        const arr = new Array<Survey>();
        for (let i = 0; data && i < data.length; i++) {
            arr.push(ContentsService.makeSurvey(data[i]));
        }
        this.statusSurveyubject.next(arr);
    }

    async getUserMeasPulseByReg_Dt(reg_dt: string) {
        const datas = await this.getUserMeasPulse();
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].reg_dt === reg_dt) {
                return datas[i];
            }
        }
        return undefined;
    }

    async getUserMeasNeuroByReg_Dt(reg_dt: string) {
        const datas = await this.getUserMeasNeuro();
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].reg_dt === reg_dt) {
                return datas[i];
            }
        }
        return undefined;
    }

    public onUserDetailChange(): BehaviorSubject<UserDetail> {
        return this.statusUserDetailSubject;
    }

    public onUserMeasPulseChange(): BehaviorSubject<UserMeasPulse[]> {
        return this.statusMeasPulseSubject;
    }
    public onUserMeasNeuroChange(): BehaviorSubject<UserMeasNeuro[]> {
        return this.statusMeasNeuroSubject;
    }

    public onUserSurveyChange(): BehaviorSubject<Survey[]> {
        return this.statusSurveyubject;
    }
    async getUserSurveys() {
        const userData = await this.getUserDetail();
        const key = await this.getUserSurvyKey();
        console.log(key);
        return this.storage.get(key).then((it: Array<Survey>) => {
            const data = new Array<Survey>();
            for (let i = 0; it && i < it.length; i++) {
                data.push(ContentsService.makeSurvey(it[i]));
            }
            return data;
        });
    }

    async addUserSurvey(survey: Survey) {
        const userData = await this.getUserDetail();
        const key = await this.getUserSurvyKey();
        return this.storage.get(key).then((it: Array<Survey>) => {
            it = it || new Array<Survey>();
            it.push(survey);
            return this.storage.set(key, it);
        }).then(it => this.nextUserSurvey(it));
    }

    async getUserSurvyKey(data?: UserDetail) {
        const userData = data || await this.getUserDetail();
        const key = (userData && userData.phone ? userData.phone : '') + '_' + (userData && userData.phone ? userData.phone : '') + '_' + this.userSuervyKey;
        console.log(key);
        return key;
    }
}
