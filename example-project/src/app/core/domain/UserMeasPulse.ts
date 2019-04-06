import {AI311ResponseData} from './api/AI311ResponseData';
import * as moment from 'moment';
import {BodyEnergyType} from '../type/BodyEnergyType';

export class UserMeasPulse extends AI311ResponseData {
    get regDt(): Date {
        return moment(this.reg_dt, 'YYYYMMDDHHmmss').toDate();
    }

    // get pulse_stressSort(): number {
    //     return Number(this.pulse_stress_cd.toString().substr(this.pulse_stress_cd.toString().length - 1, 1));
    // }

    // get heart_healthSort(): number {
    //     return Number(this.heart_health_cd.toString().substr(this.heart_health_cd.toString().length - 1, 1));
    // }

    // get ans_activeSort(): number {
    //     return Number(this.ans_active_cd.toString().substr(this.ans_active_cd.toString().length - 1, 1));
    // }

    // get fatigueSort(): number {
    //     return Number(this.fatigue_cd.toString().substr(this.fatigue_cd.toString().length - 1, 1));
    // }

    // get body_energySort(): number {
    //     return Number(this.body_energy_cd.toString().substr(this.body_energy_cd.toString().length - 1, 1));
    // }
    // get pulse_stressAbsolute(): number {
    //     // ,"<spring:message code="word.ES001"/>","<spring:message code="word.ES002"/>","<spring:message code="word.ES003"/>","<spring:message code="word.ES004"/>","<spring:message code="word.ES005"/>"][${meas.pulse_stress_cd_sort}]+")",  //${meas.pulse_stress_cd_nm}
    //     // 스트레스//매우낮음[ES001](s:1 d:0 g:5), 낮음[ES002](s:2 d:1 g:4), 적정[ES003](s:3 d:2 g:3), 높음[ES004](s:4 d:3 g:2), 매우높음[ES005](s:5 d:4 g:1)
    //     return [0, 5, 4, 3, 2, 1][this.pulse_stressSort];
    // }

    // get heart_healthAbsolute(): number {
    //     // 심장건강코드//위험[HH001](s:1 d:0 g:1), 경고[HH002](s:2 d:1 g:2), 양호[HH003](s:3 d:2 g:3), 건강[HH004](s:4 d:3 g:4), 매우건강[HH005](s:5 d:4 g:5)
    //     // +["?","<spring:message code="word.HH001"/>","<spring:message code="word.HH002"/>","<spring:message code="word.HH003"/>","<spring:message code="word.HH004"/>","<spring:message code="word.HH005"/>"][${meas.heart_health_cd_sort}]+")", //${meas.heart_health_cd_nm}
    //     return [0, 1, 2, 3, 4, 5][this.heart_healthSort];
    // }

    // get ans_activeAbsolute(): number {
    //     // 자율신경활성코드//위험[AN001](s:1 d:0 g:1), 경고[AN002](s:2 d:1 g:2), 양호[AN003](s:3 d:2 g:3), 건강[AN004](s:4 d:3 g:4), 매우건강[AN005](s:5 d:4 g:5)
    //     // "/>\r\n("+["?","<spring:message code="word.AN001"/>","<spring:message code="word.AN002"/>","<spring:message code="word.AN003"/>","<spring:message code="word.AN004"/>","<spring:message code="word.AN005"/>"][${meas.ans_active_cd_sort}]+")", //${meas.ans_active_cd_nm}
    //     return [0, 1, 2, 3, 4, 5][this.ans_activeSort];
    // }

    // get fatigueAbsolute(): number {
    //     // 피로도//정상[FT001](s:1 d:0 g:5), 관심[FT002](s:2 d:1 g:4), 주의[FT003](s:3 d:2 g:3), 경고[FT004](s:4 d:3 g:2), 위험[FT005](s:5 d:4 g:1)
    //     // ","<spring:message code="word.FT001"/>","<spring:message code="word.FT002"/>","<spring:message code="word.FT003"/>","<spring:message code="word.FT004"/>","<spring:message code="word.FT005"/>"][${meas.fatigue_cd_sort}]+")",//${meas.fatigue_cd_nm}
    //     return [0, 5, 4, 3, 2, 1][this.fatigueSort];
    // }

    // get body_energyAbsolute(): number {
    //     // 신체활력코드//[Very Low (무기력)1](1),	[Low (약간 무기력)2](2),	[Normal Low (보통)3](4),	[Normal (활력)4,Normal High (활력)4](5),   [High (긴장)5,Very High (긴장)5](3)
    //     // ["?","<spring:message code="word.BE001"/>","<spring:message code="word.BE002"/>","<spring:message code="word.BE003"/>","<spring:message code="word.BE004.BE005"/>","<spring:message code="word.BE006.BE007"/>"][${meas.body_energy_level}]+")", //${meas.body_energy_cd_nm}
    //     const bt = BodyEnergyType.meta.getMetaDataByCode(this.body_energy_cd);
    //     if (bt) {
    //         return [0, 1, 2, 4, 5, 3][bt.level];
    //     } else {
    //         return undefined;
    //     }
    // }
}

