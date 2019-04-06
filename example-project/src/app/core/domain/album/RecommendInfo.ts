import {AlbumContent} from './AlbumContent';

export class RecommendInfo {
    code: string;
    contents: AlbumContent[];
    get parent(): string {
        return this.code.substr(0, 2) + '000';
    }
}
