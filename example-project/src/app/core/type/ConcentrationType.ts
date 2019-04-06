import {MetaType} from './MetaType';

export enum ConcentrationType {
    verylow         = 'CD001', // 1
    low             = 'CD002', // 2
    normal          = 'CD003', // 3
    high            = 'CD004', // 4
    veryHigh        = 'CD005' //  5
}

export namespace ConcentrationType {
    export const meta = new MetaType(
        [
            {code: ConcentrationType.verylow , color: '#F32951', sort: 1, level: 1, safe: false},
            {code: ConcentrationType.low     , color: '#FC7B2D', sort: 2, level: 2, safe: false},
            {code: ConcentrationType.normal  , color: '#C8CE2C', sort: 3, level: 3, safe: true},
            {code: ConcentrationType.high    , color: '#1ED1C3', sort: 4, level: 4, safe: true},
            {code: ConcentrationType.veryHigh, color: '#488EBF', sort: 5, level: 5, safe: true},
        ], 'CD000'
    );
}
