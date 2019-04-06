import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {ApiCode} from '../core/code/ApiCode';

import {AI008Response} from '../core/domain/api/AI008Response';
import {AlertController} from '@ionic/angular';
import {AlertService} from '../core/services/alert.service';
import {AI007Response} from '../core/domain/api/AI007Response';
// import doSomething = ApiCode.doSomething;


@Component({
    selector: 'app-personal',
    templateUrl: './personal.page.html',
    styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

    public data: string;

    constructor(private storage: Storage, private alertController: AlertController, private translateService: TranslateService, private alertService: AlertService) {
        // ApiCode.doSomething()
        // const mode = Mode.X;
        //
        // const str = Mode.toString(mode);
        // alert(str);
        //
        // const m = Mode.parse(str);
        // alert(m);


        // console.log(Color.mixColor('yellow'));
        // ApiCode.doSomething();
        // ApiCode.AI001_AppVersionCheck.
    }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        const data = await this.storage.get(ApiCode[ApiCode.AI007]) as AI007Response;
        if (data) {
            this.data = data.info;
        } else {
            this.alertService.alert('Network_check_retry');
        }
    }

}
