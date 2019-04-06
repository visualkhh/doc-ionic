import {MetaType} from './MetaType';
// 두뇌 활동정도
export enum MentalType {
    verylow         = 'MC001', // 매우부족	1
    low             = 'MC002', // 부족	2
    normal          = 'MC003', // 적정	3
    high            = 'MC004', // 부하	4
    veryHigh        = 'MC005'  // 과부하	5

}
export namespace MentalType {
    export const meta = new MetaType(
        [
            {code: MentalType.verylow , color: '#F32951', sort: 1, level: 1, safe: false},
            {code: MentalType.low     , color: '#FC7B2D', sort: 2, level: 3, safe: false},
            {code: MentalType.normal  , color: '#488EBF', sort: 3, level: 5, safe: true},
            {code: MentalType.high    , color: '#FC7B2D', sort: 4, level: 4, safe: false},
            {code: MentalType.veryHigh, color: '#F32951', sort: 5, level: 2, safe: false},
        ], 'MC000'
    );
}
