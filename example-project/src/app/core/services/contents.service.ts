import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
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

import {map, filter, scan, tap} from 'rxjs/operators';

import {RequestHead} from '../domain/api/RequestHead';
import {Device} from '@ionic-native/device/ngx';
import {AlertController, Platform} from '@ionic/angular';
import {AI001Request} from '../domain/api/AI001Request';
import {OSType} from '../type/OSType';
import {AI001Response} from '../domain/api/AI001Response';
import {ResponseHead} from '../domain/api/ResponseHead';
import {Observable, throwError} from 'rxjs';
import {RequestBody} from '../domain/api/RequestBody';
import {ApiCode} from '../code/ApiCode';
import {UserService} from './user.service';
import {ResponseBody} from '../domain/api/ResponseBody';
import {AI001DataLastVer} from '../domain/api/AI001DataLastVer';
import {DataType} from '../type/DataType';
import {AI002Request} from '../domain/api/AI002Request';
import {AI007Request} from '../domain/api/AI007Request';
import {AI008Request} from '../domain/api/AI008Request';
import * as albums from '../../../assets/contents/albums.json';
import * as recommends from '../../../assets/contents/recommendations.json';
import * as contents from '../../../assets/contents/contents.json';
import * as surveyQuesion from '../../../assets/surveys/surveyQuesion.json';
import * as surveyResults from '../../../assets/surveys/surveyResult.json';
import {Survey} from '../domain/survey/Survey';
import {Album} from '../../../assets/contents/Album';
import {Content} from '../../../assets/contents/Content';
import {SurveyQuesion} from '../../../assets/surveys/SurveyQuesion';
import {SurveyResult} from '../../../assets/surveys/SurveyResult';
import {SurveyQuesionResult} from '../../../assets/surveys/SurveyQuesionResult';
import {SurveyR00002} from '../domain/survey/SurveyR00002';
import {SurveyR00005} from '../domain/survey/SurveyR00005';
import {SurveyR00003} from '../domain/survey/SurveyR00003';
import {SurveyR00004} from '../domain/survey/SurveyR00004';
import {SurveyQuesionResearch} from '../../../assets/surveys/SurveyQuesionResearch';
import {Question} from '../../../assets/surveys/Question';
import {AlbumInfo} from '../domain/album/AlbumInfo';
import {AlbumContent} from '../domain/album/AlbumContent';
import {Recommend} from '../../../assets/contents/Recommend';
import {RecommendInfo} from '../domain/album/RecommendInfo';



@Injectable()
export class ContentsService {

    // const a = this.surveyQuesion.results;
    private _surveys: Array<Survey>;

    constructor() {
        this.serveyInitialize();
    }

    public static makeSurvey(data: SurveyQuesionResearch<Question>): Survey {
        const types = {
            R00002: SurveyR00002,
            R00003: SurveyR00003,
            R00004: SurveyR00004,
            R00005: SurveyR00005,
        };
        return Object.assign(new (types[data.r_code] || Survey), JSON.parse(JSON.stringify(data)));
    }
    private serveyInitialize() {
        // survey
        this._surveys = new Array<Survey>();
        this.surveyQuesion.researchs.forEach(it => {
            const survey = ContentsService.makeSurvey(it);
            // const survey = Object.assign(new Survey(), it);
            survey.results = new Array<SurveyResult>();
            this.getSurveyQuesionResultByCode(survey.r_code).r_results.forEach(sit => {
                survey.results.push(this.getSurveyResultByCode(sit));
            });
            this._surveys.push(survey);
        });
    }
    // albums
   private get albums(): Album[] {
        return JSON.parse(JSON.stringify(albums));
    }
   // private get recommends(): {[param: string]: string | string[];} {
   private get recommends(): Recommend[] {
        return recommends;
    }
    get recommendInfos(): RecommendInfo[] {
        const newAts = new Array<RecommendInfo>();
        this.recommends.forEach(it => {
            const at = <RecommendInfo>Object.assign(new RecommendInfo(), it);
            const newContents = new Array<AlbumContent>();
            this.getContents(it.contents).forEach(sit => newContents.push(Object.assign(new AlbumContent(), sit)));
            at.contents = newContents;
            newAts.push(at);
        });
        return newAts;
    }
    getRecommendInfo(code: string): RecommendInfo {
        const data = this.recommendInfos;
        for (let i = 0; i < data.length; i++) {
            if (code === data[i].code) {
                return data[i];
            }
        }
        return undefined;
    }
    // public getRecommendInfos(...codes: string[]): RecommendInfo[] {
    public getRecommendInfos(codes: string[]): RecommendInfo[] {
        const ats = new Array<RecommendInfo>();
        codes.forEach(it => {
            const data = this.getRecommendInfo(it);
            if (data) {
                ats.push(data);
            }
        });
        return ats;
    }
    get albumInfos(): AlbumInfo[] {
        const newAlbums = new Array<AlbumInfo>();
        albums.forEach(it => {
            const atAlbum = <AlbumInfo>Object.assign(new AlbumInfo(), it);
            const newContents = new Array<AlbumContent>();
            this.getContents(it.contents).forEach(sit => newContents.push(Object.assign(new AlbumContent(), sit)));
            atAlbum.contents = newContents;
            newAlbums.push(atAlbum);
        });
        return newAlbums;
    }


    private get contents(): Content[] {
        return contents;
    }
    public getAlbumContents(ids: string[]): AlbumContent[] {
        const arrs = new Array<AlbumContent>()
        this.getContents(ids).forEach(it => arrs.push(Object.assign(new AlbumContent(), it)));
        return arrs;
    }
    private getContents(ids: string[]): Content[] {
        const arrs = new Array<Content>()
        for (let i = 0; i < ids.length; i++) {
            const con = this.getContent(ids[i]);
            if (con) {
                arrs.push(con);
            }
        }
        return arrs;
    }

    private getContent(ids: string): Content {
        for (let j = 0; j < this.contents.length; j++) {
            if (ids === this.contents[j].c_id) {
                return this.contents[j];
                break;
            }
        }
        return undefined;
    }
    // survey
    private get surveyQuesion(): SurveyQuesion {
        return surveyQuesion;
    }
    private get surveyResults(): SurveyResult[] {
        return surveyResults;
    }
    getSurveyQuesionResultByCode(r_code: string): SurveyQuesionResult {
        for (let i = 0; i < this.surveyQuesion.results.length; i++) {
            if (this.surveyQuesion.results[i].r_code === r_code) {
                return this.surveyQuesion.results[i];
            }
        }
    }
    getSurveyQuesionResearchByCode(r_code: string): SurveyQuesionResearch<Question> {
        for (let i = 0; i < this.surveyQuesion.researchs.length; i++) {
            if (this.surveyQuesion.researchs[i].r_code === r_code) {
                return this.surveyQuesion.researchs[i];
            }
        }
    }
    getSurveyResultByCode(result_code: string): SurveyResult {
        for (let i = 0; i < this.surveyResults.length; i++) {
            if (this.surveyResults[i].result_code === result_code) {
                return this.surveyResults[i];
            }
        }
    }
    get surveys(): Array<Survey> {
        return this._surveys;
    }
    getMakeSurvey(r_code: string): Survey {
        let data: Survey;
        for (let i = 0; i < this._surveys.length; i++) {
            if (this._surveys[i].r_code === r_code) {
                data = ContentsService.makeSurvey(this._surveys[i]);
                break;
            }
        }
        return data;
    }
}
