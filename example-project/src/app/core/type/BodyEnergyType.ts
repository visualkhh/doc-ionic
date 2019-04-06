import {PulseStressType} from './PulseStressType';
import {MetaType} from './MetaType';
// 맥파 신체활력도
export enum BodyEnergyType {
    veryLow     = 'BE001',	// 1 Very Low (무기력)
    low         = 'BE002', 	// 2 Low (약간 무기력)
    normalLow   = 'BE003', // 3 Normal Low (보통)
    normal      = 'BE004', // 4 Normal (활력)
    normalHigh  = 'BE005', // 5 Normal High (활력)
    high        = 'BE006', // 6 High (긴장)
    veryHigh    = 'BE007' // 7 Very High (긴장)


}
// (A.BODY_ENERGY_CD,'BE001','1','BE002','2', 'BE003','3', 'BE004','4','BE005','4','BE006','5','BE007','5','0') AS BODY_ENERGY_LEVEL,
export namespace BodyEnergyType {
    export const meta = new MetaType(
        [
            {code: BodyEnergyType.veryLow   , color: '#F32951', sort: 1, level: 1, safe: false},
            {code: BodyEnergyType.low       , color: '#FC7B2D', sort: 2, level: 2, safe: false},
            {code: BodyEnergyType.normalLow , color: '#C8CE2C', sort: 3, level: 4, safe: true},
            {code: BodyEnergyType.normal    , color: '#488EBF', sort: 4, level: 5, safe: true},
            {code: BodyEnergyType.normalHigh, color: '#488EBF', sort: 5, level: 5, safe: true},
            {code: BodyEnergyType.high      , color: '#8945E9', sort: 6, level: 3, safe: false},
            {code: BodyEnergyType.veryHigh  , color: '#8945E9', sort: 7, level: 3, safe: false},
        ], 'BE000' // 1, 2, 4, 5, 3
    );

    // export function getFiveType(code: BodyEnergyType): BodyEnergyType {
    //     switch (code) {
    //         case BodyEnergyType.veryLow   : return BodyEnergyType.veryLow   ; break;
    //         case BodyEnergyType.low       : return BodyEnergyType.low       ; break;
    //         case BodyEnergyType.normalLow : return BodyEnergyType.normalLow ; break;
    //         case BodyEnergyType.normal    : return BodyEnergyType.normal    ; break;
    //         case BodyEnergyType.normalHigh: return BodyEnergyType.normal    ; break;
    //         case BodyEnergyType.high      : return BodyEnergyType.normalHigh; break;
    //         case BodyEnergyType.veryHigh  : return BodyEnergyType.normalHigh; break;
    //         default: return undefined;
    //     }
    // }
}
