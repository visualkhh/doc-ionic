import {MetaType} from './MetaType';
// 심장건강도
export enum HeartHealthType {
    dangers     = 'HH001', // 위험	1
    warning     = 'HH002', // 경고	2
    normal      = 'HH003', // 양호	3
    good        = 'HH004', // 건강	4
    veryGood    = 'HH005' // 매우건강	5
}

export namespace HeartHealthType {
    export const meta = new MetaType(
        [
            {code: HeartHealthType.dangers , color: '#F32951', sort: 1, level: 1, safe: false},
            {code: HeartHealthType.warning , color: '#FC7B2D', sort: 2, level: 2, safe: false},
            {code: HeartHealthType.normal  , color: '#C8CE2C', sort: 3, level: 3, safe: true},
            {code: HeartHealthType.good    , color: '#1ED1C3', sort: 4, level: 4, safe: true},
            {code: HeartHealthType.veryGood, color: '#488EBF', sort: 5, level: 5, safe: true},
        ], 'HH000'
    );
}
