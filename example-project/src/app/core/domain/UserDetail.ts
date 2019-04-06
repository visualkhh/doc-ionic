import {AI025Response} from './api/AI025Response';

export class UserDetail extends AI025Response {
    // public phone: string;
    // public birthDay: string;
    // constructor(private phone: string, private birthDay: string) {
    // }
    public login = false;
    public autoLogin = false;
}
