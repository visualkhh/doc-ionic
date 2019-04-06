import {ResponseBody} from './ResponseBody';

import {ConcentrationType} from '../../type/ConcentrationType';
import {MentalType} from '../../type/MentalType';
import {BrainStressType} from '../../type/BrainStressType';
import {ConcentrationCaseType} from '../../type/ConcentrationCaseType';
import {NeuroBalanceType} from '../../type/NeuroBalanceType';

export class AI312ResponseData implements ResponseBody {
    concentration_cd: ConcentrationType;    // 신체활력도
    concentration_type: ConcentrationCaseType;
    mental_cd: MentalType;
    stress_cd: BrainStressType;
    balance_cd: NeuroBalanceType;       // 좌우불균형
    reg_dt: string;
    mental: string;
    stress: string;
}
