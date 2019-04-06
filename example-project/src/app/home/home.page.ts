import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../core/services/user.service';
import {UserDetail} from '../core/domain/UserDetail';
import {LangChangeEvent} from '@ngx-translate/core/lib/translate.service';
import {ApiService} from '../core/services/api.service';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
import {UserMeasNeuro} from '../core/domain/UserMeasNeuro';
import {AI312ResponseData} from '../core/domain/api/AI312ResponseData';
import {AI311ResponseData} from '../core/domain/api/AI311ResponseData';
import * as moment from 'moment';
import {ContentsService} from '../core/services/contents.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {DataType} from '../core/type/DataType';
import {ErrorCode} from '../core/code/ErrorCode';
import {AlbumInfo} from '../core/domain/album/AlbumInfo';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public data: string;
    public userDetail: UserDetail;
    public userMeasPulse: UserMeasPulse;
    public userMeasNeuro: UserMeasNeuro;
    public albums: AlbumInfo[];


    constructor(public trans: TranslateService, private userService: UserService, private iab: InAppBrowser, private contentsService: ContentsService) {

        // this.userService.getUserDetail().then(it => this.userDetail = it);
        this.userService.onUserDetailChange().subscribe(it => this.userDetail = it);
        // this.userService.getUserMeasPulse().then(it => this.userMeasPulses = it);
        this.userService.onUserMeasPulseChange().subscribe(it => this.userMeasPulse = it[it.length - 1]);
        // this.userService.getUserMeasNeuro().then(it => this.userMeasNeuros = it);
        this.userService.onUserMeasNeuroChange().subscribe(it => this.userMeasNeuro = it[it.length - 1]);
        this.albums = this.contentsService.albumInfos;
    }

    ngOnInit(): void {
        // console.log(DataType.clause);
        // console.log(DataType[DataType.clause]);
        // console.log(DataType['survey']);
        // Object.keys(DataType).forEach(it => console.log(it));
        // console.log(Object.keys(DataType).includes('survey'));
        // console.log(Object.keys(DataType).includes('s22urvey'));
        // console.log('--------')
        // console.log(ErrorCode[ErrorCode.M1005]);

        // ['a','d'].includes();
        // document.querySelector('html').style.setProperty('--ion-color-primary', '#ff0000');
        // console.log('home ngOnInit');
        // console.log(this.translateService.currentLang);
        // this.translateService.get('lang').subscribe(it => {
        //     this.imgRootPath = it;
        // });
        // this.translateService.onLangChange.subscribe((it: LangChangeEvent) => {
        //     this.imgRootPath = it.translations.lang;
        //     console.log(this.imgRootPath);
        // });
        // let dateString = '22-04-2017'; //whatever date string u have
        // let dateObject = moment(dateString, 'DD-MM-YYYY').toDate();
        // console.log(dateObject)

        // this.userService.getUserMeasPulse().then((it: UserMeasPulse) => {
        //     if (it && it.list && it.list.length > 0) {
        //         this.userMeasPulseData = Object.assign(new AI311ResponseData(), it.list[it.list.length - 1]);
        //     }
        // });
        // // console.log(dateString)
        // this.userService.getUserMeasNeuro().then((it: UserMeasNeuro) => {
        //     if (it && it.list && it.list.length > 0) {
        //         this.userMeasNeuroData = Object.assign(new AI312ResponseData(), it.list[it.list.length - 1]);
        //     }
        // });
    }


    openBrower(url: string) {
        const browser = this.iab.create(url);
        browser.show();
    }
}
