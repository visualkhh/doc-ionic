import {MetaType} from './MetaType';
// 자율신경
export enum AnsActiveType {
    dangers         = 'AN001', // 위험	1
    warning         = 'AN002', // 경고	2
    normal          = 'AN003', // 양호	3
    good            = 'AN004', // 건강	4
    veryGood        = 'AN005' // 매우건강	5
}

export namespace AnsActiveType {
    export const meta = new MetaType(
        [
            {code: AnsActiveType.dangers , color: '#F32951', sort: 1, level: 1, safe: false},
            {code: AnsActiveType.warning , color: '#FC7B2D', sort: 2, level: 2, safe: false},
            {code: AnsActiveType.normal  , color: '#C8CE2C', sort: 3, level: 3, safe: true},
            {code: AnsActiveType.good    , color: '#1ED1C3', sort: 4, level: 4, safe: true},
            {code: AnsActiveType.veryGood, color: '#488EBF', sort: 5, level: 5, safe: true},
        ], 'AN000'
    );
}
