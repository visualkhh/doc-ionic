import {MetaType} from './MetaType';
// 좌우뇌 불균형
export enum NeuroBalanceType {
    veryLeft    = 'BC001', // 매우좌뇌편중	1
    left        = 'BC002', // 좌뇌편중	2
    center      = 'BC003', // 균형	3
    right       = 'BC004', // 우뇌편중	4
    veryRight   = 'BC005', // 매우우뇌편중	5

}
export namespace NeuroBalanceType {
    export const meta = new MetaType(
        [
            {code: NeuroBalanceType.veryLeft , color: '#F32951', sort: 1, level: 2, safe: false},
            {code: NeuroBalanceType.left     , color: '#FC7B2D', sort: 2, level: 4, safe: false},
            {code: NeuroBalanceType.center   , color: '#488EBF', sort: 3, level: 5, safe: true},
            {code: NeuroBalanceType.right    , color: '#FC7B2D', sort: 4, level: 3, safe: false},
            {code: NeuroBalanceType.veryRight, color: '#F32951', sort: 5, level: 1, safe: false},
        ], 'BC000'
    );
}
