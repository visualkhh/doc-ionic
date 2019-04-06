import {AI312ResponseData} from './api/AI312ResponseData';
import * as moment from 'moment';
import {ConcentrationType} from '../type/ConcentrationType';
import {NeuroBalanceType} from '../type/NeuroBalanceType';
import {BrainStressType} from '../type/BrainStressType';
import {MentalType} from '../type/MentalType';

export class UserMeasNeuro extends AI312ResponseData {

    get regDt(): Date {
        return moment(this.reg_dt, 'YYYYMMDDHHmmss').toDate();
    }

    // get concentrationSort(): number {
    //    return Number(this.concentration_cd.toString().substr(this.concentration_cd.toString().length - 1, 1));
    // }
    // get mentalSort(): number {
    //     return Number(this.mental_cd.toString().substr(this.mental_cd.toString().length - 1, 1));
    // }
    // get stressSort(): number {
    //     return Number(this.stress_cd.toString().substr(this.stress_cd.toString().length - 1, 1));
    // }
    // get balanceSort(): number {
    //     return Number(this.balance_cd.toString().substr(this.balance_cd.toString().length - 1, 1));
    // }
    // get concentrationAbsolute(): number {
    //     // +["?","<spring:message code="word.CD001"/>","<spring:message code="word.CD002"/>","<spring:message code="word.CD003"/>","<spring:message code="word.CD004"/>","<spring:message code="word.CD005"/>"][${meas.concentration_cd_sort}]+")", //${meas.concentration_cd_nm}
    //     // 집중도//매우낮음[CD001](s:1 d:0 g:1), 낮음[CD002](s:2 d:1 g:2), 보통[CD003](s:3 d:2 g:3), 높음[CD004](s:4 d:3 g:4), 매우높음[CD005](s:5 d:4 g:5)
    //     return [0, 1, 2, 3, 4, 5][this.concentrationSort];
    // }
    // get mentalAbsolute(): number {
    //     // +["?","<spring:message code="word.MC001"/>","<spring:message code="word.MC002"/>","<spring:message code="word.MC003"/>","<spring:message code="word.MC004"/>","<spring:message code="word.MC005"/>"][${meas.mental_cd_sort}]+")", //${meas.mental_cd_nm}
    //     // 부하도(활동)//매우부족[MC001](s:1 d:0 g:1), 부족[MC002](s:2 d:1 g:3), 적정[MC003](s:3 d:2 g:5), 부하[MC004](s:4 d:3 g:4), 과부하[MC005](s:5 d:4 g:2)
    //     return [0, 1, 3, 5, 4, 2][this.mentalSort];
    // }
    // get stressAbsolute(): number {
    //     // ["?","<spring:message code="word.TR001"/>","<spring:message code="word.TR002"/>","<spring:message code="word.TR003"/>","<spring:message code="word.TR004"/>","<spring:message code="word.TR005"/>"][${meas.stress_cd_sort}]+")", //${meas.stress_cd_nm}
    //     // 스트레스//매우낮음[TR001](s:1 d:0 g:5), 낮음[TR002](s:2 d:1 g:4), 적정[TR003](s:3 d:2 g:3), 높음[TR004](s:4 d:3 g:2), 매우높음[TR005](s:5 d:4 g:1)
    //     return [0, 5, 4, 3, 2, 1][this.stressSort];
    // }
    // get balanceAbsolute(): number {
    //     // "<spring:message code="word.brainunbalance"/>\r\n(${meas.balance_cd_nm})", //${meas.balance_cd_nm}
    //     // 좌우불균형//불균형(매우 좌뇌 편중)[BC001](s:1 d:4 g:2), 불균형(좌뇌 편중)[BC002](s:2 d:3 g:4), 균형[BC003](s:3 d:2 g:5), 불균형(우뇌 편중)[BC004](s:4 d:1 g:3), 불균형(매우 우뇌 편중)[BC005](s:5 d:0 g:1)
    //     return [0, 2, 4, 5, 3, 1][this.balanceSort];
    // }
    get tot(): number {
        // 집중도 //   매우낮음(5),	낮음(10),	보통(15),	높음(20),	매우높음(25)
        const concentration_val 	= [0, 5, 10, 15, 20, 25][ConcentrationType.meta.getMetaDataByCode(this.concentration_cd).sort];
        // 부하도(활동)//   매우낮음(5),낮음(15),보통(25),높음(20),매우높음(10)
        const mental_val 			= [0, 5, 15, 25, 20, 10][MentalType.meta.getMetaDataByCode(this.mental_cd).sort];
        // 뇌 스트레스// 부족(25),다소적정(20),적정(15),다소높음(10),높음(5)
        const stress_val 			= [0, 25, 20, 15, 10, 5][BrainStressType.meta.getMetaDataByCode(this.stress_cd).sort];
        // 불군형// 불균형(매우 좌측 편중)10,불균형(좌측 편중)20,균형25,불균형(우측 편중)15,불균형(매주 우측 편중)5
        const balance_val 		    = [0, 10, 20, 25, 15, 5][NeuroBalanceType.meta.getMetaDataByCode(this.balance_cd).sort];
        return concentration_val + mental_val + stress_val + balance_val;
    }
}
