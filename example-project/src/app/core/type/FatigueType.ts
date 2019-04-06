// 누적 피로도
import {MetaType} from './MetaType';

export enum FatigueType {
 normal   = 'FT001', // 정상	1
 interest = 'FT002', // 관심	2
 careful  = 'FT003', // 주의	3
 warning  = 'FT004', // 경고	4
 dangers  = 'FT005', // 위험	5

}
export namespace FatigueType {
    export const meta = new MetaType(
        [
            {code: FatigueType.normal   , color: '#488EBF', sort: 1, level: 5, safe: true},
            {code: FatigueType.interest , color: '#FAC61E', sort: 2, level: 4, safe: false},
            {code: FatigueType.careful  , color: '#B945E9', sort: 3, level: 3, safe: false},
            {code: FatigueType.warning  , color: '#FC7B2D', sort: 4, level: 2, safe: false},
            {code: FatigueType.dangers  , color: '#F32951', sort: 5, level: 1, safe: false},
        ], 'FT000'
    );
}
