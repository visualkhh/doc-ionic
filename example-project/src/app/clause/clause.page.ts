import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';
import {ApiCode} from '../core/code/ApiCode';
import {AI008Response} from '../core/domain/api/AI008Response';
import {AlertService} from '../core/services/alert.service';

@Component({
    selector: 'app-clause',
    templateUrl: './clause.page.html',
    styleUrls: ['./clause.page.scss'],
})
export class ClausePage implements OnInit {

    public data: string;
    constructor(private storage: Storage, private alertController: AlertController, private translateService: TranslateService, private alertService: AlertService) {
    }

    ngOnInit() {
        this.getData();
    }

    async getData() {
       const data = await this.storage.get(ApiCode[ApiCode.AI008]) as AI008Response;
        if (data) {
            this.data = data.info;
        } else {
            this.alertService.alert('Network_check_retry');
        }
    }

}
