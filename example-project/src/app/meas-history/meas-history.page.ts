import {Component, OnInit} from '@angular/core';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
import {UserMeasNeuro} from '../core/domain/UserMeasNeuro';
import {UserService} from '../core/services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-meas-history',
    templateUrl: './meas-history.page.html',
    styleUrls: ['./meas-history.page.scss'],
})
export class MeasHistoryPage implements OnInit {

    public measTypeChecked: string;
    public userMeasPulses: UserMeasPulse[];
    public userMeasNeuros: UserMeasNeuro[];

    constructor(public trans: TranslateService, private userService: UserService) {
        this.measTypeChecked = 'pulse';
        this.userService.onUserMeasPulseChange().subscribe(it => this.userMeasPulses = it.reverse());
        this.userService.onUserMeasNeuroChange().subscribe(it => this.userMeasNeuros = it.reverse());
    }

    ngOnInit() {
        console.log('MeasHistoryPage onInit');
        this.userService.syncUserMeas();
    }


    measPulseAnsAgeAvg(): number|string {
        let r = 0;
        for (let i = 0; this.userMeasPulses && i < this.userMeasPulses.length; i++) {
            r += Number(this.userMeasPulses[i].ans_age);
        }
        return this.userMeasPulses && this.userMeasPulses.length > 0 ?  Math.floor(r / this.userMeasPulses.length) : '-';
    }

    measNeuroTotAvg(): number|string {
        let r = 0;
        for (let i = 0; this.userMeasNeuros && i < this.userMeasNeuros.length; i++) {
            r += Number(this.userMeasNeuros[i].tot);
        }
        return this.userMeasNeuros && this.userMeasNeuros.length > 0 ?  Math.floor(r / this.userMeasNeuros.length) : '-';
    }
    historyTypeClicked(event: CustomEvent | any) {
        this.measTypeChecked = event.target.value;
    }
}
