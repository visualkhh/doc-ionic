import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/observable/of';
import {fromArray} from 'rxjs-compat/observable/fromArray';
import {forkJoin} from 'rxjs';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
import {UserMeasNeuro} from '../core/domain/UserMeasNeuro';
import {UserService} from '../core/services/user.service';
import {PulseStressType} from '../core/type/PulseStressType';
import {MetaTypeData} from '../core/type/MetaTypeData';
import {BodyEnergyType} from '../core/type/BodyEnergyType';
import {HeartHealthType} from '../core/type/HeartHealthType';
import {FatigueType} from '../core/type/FatigueType';
import {AnsActiveType} from '../core/type/AnsActiveType';
import {ConcentrationType} from '../core/type/ConcentrationType';
import {NeuroBalanceType} from '../core/type/NeuroBalanceType';
import {MentalType} from '../core/type/MentalType';
import {BrainStressType} from '../core/type/BrainStressType';
import {Storage} from '@ionic/storage';
import {AI002Request} from '../core/domain/api/AI002Request';
import {ApiCode} from '../core/code/ApiCode';
import {MetaType} from '../core/type/MetaType';
import {GaugeStepData} from 'angular-graphk/dist/gaugeStep/GaugeStepData';

@Component({
  selector: 'app-meas-result',
  templateUrl: './meas-result.page.html',
  styleUrls: ['./meas-result.page.scss'],
})
export class MeasResultPage implements OnInit {
    public code: string;
    public data: MetaType;
    public title: string;
    public desc: string;
    public advice: string[];
    public datas: Array<any>;
    @ViewChild('graphContainer') public canvasContainerElementRef: ElementRef;
    constructor(private storage: Storage, public trans: TranslateService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.code = this.route.snapshot.paramMap.get('code');
        // let data = PulseStressType.meta.getMetaDataByCode(this.code);
        // data.color;

        // this.storage.get(ApiCode[ApiCode.AI002]).then(it => {
        //     console.log('---- ', it);
        // })
        const targets = [
            PulseStressType.meta, BodyEnergyType.meta, HeartHealthType.meta, FatigueType.meta, AnsActiveType.meta,
            ConcentrationType.meta, NeuroBalanceType.meta, MentalType.meta, BrainStressType.meta
        ];
        for (let i = 0; i < targets.length; i++) {
            const it = targets[i];
            if (it.getMetaDataByCode(this.code)) {
                this.settingData(this.code, it);
                break;
            }
        }
        // PulseStressType.getFiveType();
        // PulseStressType.meta;
       // if (Object.values(PulseStressType).includes(this.code)) {          // PulseStressType 맥파 스트레스
       //
       // } else if (Object.values(BodyEnergyType).includes(this.code)) {    // PulseStressType 맥파 신체화력
       //
       // } else if (Object.values(HeartHealthType).includes(this.code)) {   // PulseStressType 맥파 심장건강도
       //
       // } else if (Object.values(FatigueType).includes(this.code)) {       // PulseStressType 맥파 누적피로도
       //
       // } else if (Object.values(AnsActiveType).includes(this.code)) {     // PulseStressType 맥파 자율신경건강도
       //
       // } else if (Object.values(ConcentrationType).includes(this.code)) { // PulseStressType 뇌파 신체활력도
       //
       // } else if (Object.values(NeuroBalanceType).includes(this.code)) {     // PulseStressType 뇌파 좌우불균형
       //
       // } else if (Object.values(MentalType).includes(this.code)) {     // PulseStressType 뇌파 두뇌활동도
       //
       // } else if (Object.values(BrainStressType).includes(this.code)) {     // PulseStressType 뇌파 두뇌스트레스
       //
       // }

        // neuro
    }

    async settingData(code: string, meta: MetaType) {
        this.data = meta;
        // const metaData = this.data.getMetaDataByCode(code);
        this.title = await this.trans.get('MEASUREMENT_DETAIL_TITLE_' + this.data.code).toPromise();
        this.desc = await this.trans.get('RESULT_DETAIL_WHERE_IS_TEXT_' + this.data.code).toPromise();

        const adviceString = await this.trans.get('RESULT_DETAIL_ADVICE_BY_' + this.code, {value: await this.trans.get(code).toPromise()}).toPromise();
        this.advice = adviceString.split('\n');
        const datas = new Array<GaugeStepData>();
        for (let i = 0; i < meta.metas.length; i++) {
            const it = meta.metas[i];
            const a = new GaugeStepData();
            // 같은 레벨값은 뿌리지 않는다 하나만 뿌린다.
            // fromArray(datas).filter((ait: MetaTypeData) => {return ait.code === it.code;}).subscribe(ait => {
            //     console.log('---');
            // })
            const dup = await fromArray(datas).filter(ait => ait['level'] === it.level).toPromise();
            if (dup) {
                dup.checked = dup.checked || code === it.code;
                continue;
            }

            a.fillStyle = it.color;
            a.title = await this.trans.get(it.code).toPromise();
            a.safe = it.safe;
            a.checked = code === it.code;
            a['level'] = it.level;
            datas.push(a);
        }
        this.datas = datas;
        // console.log(this.datas);
    }
}
