import {MetaType} from './MetaType';

export enum PulseStressType {
    verylow         = 'ES001', // 매우낮음	1
    low             = 'ES002', // 낮음	2
    normal          = 'ES003', // 적정	3
    high            = 'ES004', // 높음	4
    veryHigh        = 'ES005', // 매우높음	5

}

export namespace PulseStressType {
    export const meta = new MetaType(
        [
            {code: PulseStressType.verylow , color: '#488EBF', sort: 1, level: 5, safe: true},
            {code: PulseStressType.low     , color: '#1ED1C3', sort: 2, level: 4, safe: true},
            {code: PulseStressType.normal  , color: '#C8CE2C', sort: 3, level: 3, safe: true},
            {code: PulseStressType.high    , color: '#FC7B2D', sort: 4, level: 2, safe: false},
            {code: PulseStressType.veryHigh, color: '#F32951', sort: 5, level: 1, safe: false},
        ], 'ES000'
    );

    //
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
