import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
// import {HttpParams} from '@angular/common/http/src/params';
import {LangChangeEvent} from '@ngx-translate/core/lib/translate.service';
// import {Observable} from 'rxjs/Observable';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/observable/of';
import {forkJoin} from 'rxjs';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {environment} from '../../../environments/environment';
// import 'rxjs-compat/add/observable/add';

import {map, filter, scan, tap} from 'rxjs/operators';

import {RequestHead} from '../domain/api/RequestHead';
import {Device} from '@ionic-native/device/ngx';
import {AlertController, Platform} from '@ionic/angular';
import {AI001Request} from '../domain/api/AI001Request';
import {OSType} from '../type/OSType';
import {AI001Response} from '../domain/api/AI001Response';
import {ResponseHead} from '../domain/api/ResponseHead';
import {RequestBody} from '../domain/api/RequestBody';
import {ApiCode} from '../code/ApiCode';
import {UserService} from './user.service';
import {ResponseBody} from '../domain/api/ResponseBody';
import {AI001DataLastVer} from '../domain/api/AI001DataLastVer';
import {DataType} from '../type/DataType';
import {AI002Request} from '../domain/api/AI002Request';
import {AI007Request} from '../domain/api/AI007Request';
import {AI008Request} from '../domain/api/AI008Request';
import {ApiHeadResultType} from '../type/ApiHeadResultType';
import {AI302Request} from '../domain/api/AI302Request';
import {RequestHwayou} from '../domain/hwayou-api/RequestHwayou';
import {MethodCode} from '../code/MethodCode';
const ApiInfo = {
    // https://developers.facebook.com/docs/accountkit/languages?locale=ko_KR
    getLocale(): string {
        const locale = window.navigator.language;
        const lang = locale.split('-')[0];
        let country = locale.split('-')[1];
        country = !country && 'ko' === lang ? 'KR' : country;
        country = !country && 'ja' === lang ? 'JP' : country;
        country = !country && 'en' === lang ? 'US' : country;
        return country || 'US';
    },
    getApiUrl(apiCode: string): string {
        const country = this.getLocale();
        let apiUrl: string;
        if ('KR' === country) { // ko_KR
            apiUrl = `http://localhost:8081/api/${apiCode}`;

        } else if ('JP' === country) { // ja_JP
            apiUrl = `h123api/${apiCode}`;
        } else {
            apiUrl = `123api/${apiCode}`;
        }
        return apiUrl;
    },
    getHawayouApiUrl(path: string): string {
        return `http://a123:5001/${path}`;
    }
};

@Injectable()
export class ApiService {
    private readonly API_HEADER_NAME = 'X-omnifit';

    constructor(private storage: Storage, private translateService: TranslateService,
                private alertController: AlertController,
                private http: HttpClient, private device: Device, public platform: Platform) {

        if (environment.startCleanDB) {
            this.storage.clear();
        }
        // locale Setting 후~
        this.storage.get('locale').then(it => {
            const locale = ApiInfo.getLocale();
            if (null === it || (null !== it && locale !== it)) {
                this.storage.clear();
            }
            return this.storage.set('locale', locale);
        }).then(it => {
            this.init();
        });
    }


    async init() {
        // APP Version 체크
        const request = new AI001Request(this.platform.is('ios') ? OSType.ios : OSType.android);
        const appVersion = await this.getApi<AI001Response>(request, false).toPromise().catch(it => {
            this.presentAlert('MSG_FIRMWARE_UPDATE_FAILURE');
        }) as AI001Response;
        const dbAppVersion = await this.storage.get(ApiCode[request.getApiCode()]).then(it => it || this.storage.set(ApiCode[request.getApiCode()], appVersion)) as AI001Response;

        if (!appVersion && !dbAppVersion) {
            this.presentAlert('MSG_FIRMWARE_UPDATE_FAILURE');
            return;
        }

        const versionMap = new Map<string, string>();
        dbAppVersion.data_last_ver.forEach(it => versionMap.set(it.data_type, it.last_updday));
        for (const it of appVersion.data_last_ver) {
            let dataType: RequestBody;
            if (it.data_type === DataType.code) {
                dataType = new AI002Request();
            } else if (it.data_type === DataType.clause) {
                dataType = new AI007Request();
            } else if (it.data_type === DataType.personal) {
                dataType = new AI008Request();
            // } else if (it.data_type === DataType.survey) {
            //     dataType = new AI302Request();
            }
            if (dataType) {
                await this.storage.get(ApiCode[dataType.getApiCode()]).then(sit => {
                    if (null === sit || versionMap.get(sit.data_type) < sit.last_updday) {
                        return this.getApi<any>(dataType).toPromise().then(ssit => {
                            // console.log('version', ssit);
                            // this.storage.set('zzzz'+dataType.getApiCode(), ssit);
                        });
                    } else {
                        return sit;
                    }
                });
            }
        }
    }

    public getApi<T extends ResponseBody>(body: RequestBody, autoSave: boolean = true, head = new RequestHead()): Observable<T> {
        head.api_code = body.getApiCode();
        head.svc_id = 'ccc';
        head.corp_id = 'cccc';
        head.os_version = this.device.version;
        head.phone_model = this.device.model;
        head.phone_mac_add = this.device.uuid;
        // head.phone_mac_add = this.device.;
        // Platform.isAndroid
        // this.myObservable().pipe(map(data => {}))
        // https://han41858.tistory.com/39
        return this.http.post<HttpResponse<any>>(
            ApiInfo.getApiUrl(ApiCode[body.getApiCode()]), body,
            {headers: new HttpHeaders().set(this.API_HEADER_NAME, JSON.stringify(head)), observe: 'response'}
        ).mergeMap((it: HttpResponse<any>) => {
            const responseHead = Object.assign(new ResponseHead(), JSON.parse(it.headers.get(this.API_HEADER_NAME)) as ResponseHead);
            // console.log(responseHead.result_code);
            // if (ApiHeadResultCode.CODE_SUCCESS !== responseHead.result_code) {
            if (ApiHeadResultType.CODE_SUCCESS === responseHead.result_code) {
                // let a = new ({ new (): T; })();
                // let a = new () => T;
                // let aa = new testType();
                // console.log(aa);
                // this.storage.set(apiCode, it.body).then(ii => {
                //     console.log(ii);
                // });
                // return from(this.storage.set(apiCode, it.body));
                // return fromPromise(this.storage.set(apiCode, it.body));

                // if (this.alwaysOnline) {
                //     this.storage.remove(body.getApiCode());
                //     // Observable.of(it.body).subscribe(isst => {
                //     //     console.log(isst);
                //     // })
                //     return Observable.of(it.body);
                // } else {
                // return this.storage.set(body.getApiCode(), it.body);
                // }
                return autoSave ? this.storage.set(ApiCode[body.getApiCode()], it.body) : Observable.of(it.body);
            } else {
                // it.status = 200;
                // throw new Error('Valid token not returned');
                throw responseHead;
            }
            // return Object.assign(new T(), it.body);
        }).catch((err: RequestHead | HttpErrorResponse) => {
            // console.log('eee ' + err);

            // http통신 에러난다면 기존 로컬을 쓴다.  그외는 에러를 낸다.
            if (err instanceof HttpErrorResponse) {
                return this.storage.get(ApiCode[body.getApiCode()]);
            } else {
                throw err;
            }
            // throw new Error('Valid token notsssssss returned');
            // return ['asd'];
            // return this.storage.get(apiCode);
        });
        // .map(it => {
        //     console.log(it);
        // });
    }

    async presentAlert(msgCode: string) {
        const header = await this.translateService.get('DIALOG_TITLE_ALERT').toPromise();
        // const subHeader = this.translateService.get('MSG_FIRMWARE_UPDATE_FAILURE').value;
        const msg = await this.translateService.get(msgCode).toPromise();
        const ok = await this.translateService.get('BTN_OK').toPromise();
        const cancel = await this.translateService.get('BTN_CANCEL').toPromise();
        // const value2 = await promise2(value1)
        const alert = await this.alertController.create({
            header: header,
            // subHeader: subHeader,
            message: msg,
            buttons: [ok]
        });
        await alert.present();
    }






    public getHwayouApi<T extends ResponseBody>(body: RequestHwayou): Observable<T> {

        // {headers: new HttpHeaders().set(this.API_HEADER_NAME, JSON.stringify(head)), observe: 'response'}
        if (body.getMethod() === MethodCode.POST) {
            return this.http.post<any>(ApiInfo.getHawayouApiUrl(body.getPath()), body);
        } else if (body.getMethod() === MethodCode.GET) {
            let params = new HttpParams();
            for (const i of Object.keys(body)) {
                params = params.append(i, body[i]);
            }
            return this.http.get<any>(ApiInfo.getHawayouApiUrl(body.getPath()), {params: params});
        }
        return undefined;
    }
    /*
    // TODO 회원 가입여부 확인
   
     */

}
