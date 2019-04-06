import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
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
import {ConcentrationType} from '../core/type/ConcentrationType';
import {PulseStressType} from '../core/type/PulseStressType';
import {HeartHealthType} from '../core/type/HeartHealthType';
import {AnsActiveType} from '../core/type/AnsActiveType';
import {FatigueType} from '../core/type/FatigueType';
import {BodyEnergyType} from '../core/type/BodyEnergyType';
import {PolygonGraphData} from '../core/components/polygon-graph/polygon-graph.component';
import {PolygonData} from 'angular-graphk/dist/polygon/PolygonData';
import {BrainStressType} from '../core/type/BrainStressType';
import {MentalType} from '../core/type/MentalType';
import {MetaTypeData} from '../core/type/MetaTypeData';
import {NeuroBalanceType} from '../core/type/NeuroBalanceType';

@Component({
    selector: 'app-meas-pulse',
    templateUrl: './meas-pulse.page.html',
    styleUrls: ['./meas-pulse.page.scss'],
})
export class MeasPulsePage implements OnInit, AfterViewInit {

    public meas: UserMeasPulse;
    public reg_dt: string;
    public pulSestressType = PulseStressType.meta;
    public bodyEnergyType = BodyEnergyType.meta;
    public heartHealthType = HeartHealthType.meta;
    public fatigueType = FatigueType.meta;
    public ansactiveType = AnsActiveType.meta;
    @ViewChild('graphContainer') public canvasContainerElementRef: ElementRef;

    constructor(public trans: TranslateService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
        // this.userService.onUserMeasPulseChange().subscribe(it => {
        //     console.log('----pp--------' + it);
        // })
    }
    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     this.canvasElementRef.nativeElement.dispatchEvent(new Event('resize'));
    //     // this.canvaseRedraw(event);
    // }

    ngOnInit() {
        this.reg_dt = this.route.snapshot.paramMap.get('dt');
        this.userService.getUserMeasPulseByReg_Dt(this.reg_dt).then(it => this.meas = it);
        // console.log(this.canvasElementRef.nativeElement)
        // event
        // Observable.fromEvent(this.canvasElementRef.nativeElement, 'resize').subscribe((event: Event) => {
        //     this.canvaseRedraw(event);
        // });
    }

    ngAfterViewInit() {
    }


    getMeasGraph(): PolygonData  {
        if (this.meas) {
            return {
                max: 5,
                data: [
                    PulseStressType.meta.getMetaDataByCode(this.meas.pulse_stress_cd).level,
                    HeartHealthType.meta.getMetaDataByCode(this.meas.heart_health_cd).level,
                    AnsActiveType.meta.getMetaDataByCode(this.meas.ans_active_cd).level,
                    FatigueType.meta.getMetaDataByCode(this.meas.fatigue_cd).level,
                    BodyEnergyType.meta.getMetaDataByCode(this.meas.body_energy_cd).level
                ]
            } as PolygonData;
        }
        return undefined;
    }

}
