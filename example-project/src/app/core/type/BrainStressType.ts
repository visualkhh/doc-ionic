import {MetaType} from './MetaType';
// 두뇌 스트레스
export enum BrainStressType {
    verylow         = 'TR001', // 매우낮음	1
    low             = 'TR002', // 낮음	2
    normal          = 'TR003', // 적정	3
    high            = 'TR004', // 높음	4
    veryHigh        = 'TR005', // 매우높음	5

}
export namespace BrainStressType {
    export const meta = new MetaType(
        [
            {code: BrainStressType.verylow , color: '#488EBF', sort: 1, level: 5, safe: true},
            {code: BrainStressType.low     , color: '#1ED1C3', sort: 2, level: 4, safe: true},
            {code: BrainStressType.normal  , color: '#C8CE2C', sort: 3, level: 3, safe: true},
            {code: BrainStressType.high    , color: '#FC7B2D', sort: 4, level: 2, safe: false},
            {code: BrainStressType.veryHigh, color: '#F32951', sort: 5, level: 1, safe: false},
        ], 'TR000'
    );
}
