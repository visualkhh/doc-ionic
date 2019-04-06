import {ResponseBody} from './ResponseBody';
import {PulseStressType} from '../../type/PulseStressType';
import {HeartHealthType} from '../../type/HeartHealthType';
import {AnsActiveType} from '../../type/AnsActiveType';
import {FatigueType} from '../../type/FatigueType';
import {BodyEnergyType} from '../../type/BodyEnergyType';

// 맥파
export class AI311ResponseData implements ResponseBody {
    pulse_stress_cd: PulseStressType; // 스트레스
    heart_health_cd: HeartHealthType; // 심장건강도
    ans_active_cd: AnsActiveType; // 자율신경건강도
    fatigue_cd: FatigueType;    // 피로도
    body_energy_cd: BodyEnergyType; // 신체활력
    ans_age: string;
    reg_dt: string;
    pulse_stress: string;
}
