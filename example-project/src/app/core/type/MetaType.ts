import {MetaTypeData} from './MetaTypeData';

export class MetaType {
    _metas: Array<MetaTypeData>;
    code?: string;

    constructor(metas: Array<MetaTypeData>, code?: string) {
        this._metas = metas;
        this.code = code;
    }

    getMetaDataByCode(code: string): MetaTypeData {
        for (let i = 0; this._metas && i < this._metas.length; i++) {
            if (this._metas[i].code === code) {
                return this._metas[i];
            }
        }
    }

    get metas(): Array<MetaTypeData> {
        let data = this._metas;
        if (data) {
            data = data.sort(function (a, b) {
                if (undefined === a.sort || null === a.sort) { return 1; }
                if (undefined === b.sort || null === b.sort) { return -1; }
                if (a.sort > b.sort) {
                    return 1;
                }
                if (a.sort < b.sort) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        }
        return data;
    }
}
