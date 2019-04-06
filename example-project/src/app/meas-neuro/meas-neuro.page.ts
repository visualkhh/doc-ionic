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
import {forkJoin} from 'rxjs';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {PolygonGraphData} from '../core/components/polygon-graph/polygon-graph.component';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
import {UserMeasNeuro} from '../core/domain/UserMeasNeuro';
import {UserService} from '../core/services/user.service';
import {ConcentrationType} from '../core/type/ConcentrationType';
import {MentalType} from '../core/type/MentalType';
import {BrainStressType} from '../core/type/BrainStressType';
import {NeuroBalanceType} from '../core/type/NeuroBalanceType';
import {PolygonData} from 'angular-graphk/dist/polygon/PolygonData';
import {MetaTypeData} from '../core/type/MetaTypeData';
import {HeartHealthType} from '../core/type/HeartHealthType';
import {AnsActiveType} from '../core/type/AnsActiveType';
import {PulseStressType} from '../core/type/PulseStressType';
import {FatigueType} from '../core/type/FatigueType';
import {BodyEnergyType} from '../core/type/BodyEnergyType';

@Component({
    selector: 'app-meas-neuro',
    templateUrl: './meas-neuro.page.html',
    styleUrls: ['./meas-neuro.page.scss'],
})
export class MeasNeuroPage implements OnInit, AfterViewInit {
    public meas: UserMeasNeuro;
    public reg_dt: string;
    public concentrationTypeMeta = ConcentrationType.meta;
    public neuroBalanceTypeMeta = NeuroBalanceType.meta;
    public mentalTypeMeta = MentalType.meta;
    public brainstressTypeMeta = BrainStressType.meta;
    @ViewChild('graphContainer') public canvasContainerElementRef: ElementRef;

    constructor(public trans: TranslateService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }


    ngOnInit() {
        this.reg_dt = this.route.snapshot.paramMap.get('dt');
        this.userService.getUserMeasNeuroByReg_Dt(this.reg_dt).then(it => this.meas = it);
    }

    ngAfterViewInit() {
    }

    getMeasGraph(): PolygonData {
        if (this.meas) {
            return {
                max: 5,
                data: [
                    ConcentrationType.meta.getMetaDataByCode(this.meas.concentration_cd).level,
                    MentalType.meta.getMetaDataByCode(this.meas.mental_cd).level,
                    BrainStressType.meta.getMetaDataByCode(this.meas.stress_cd).level,
                    NeuroBalanceType.meta.getMetaDataByCode(this.meas.balance_cd).level
                    // 1,2,3,4,5
                ]
            } as PolygonData;
        }
        return undefined;
    }

}
