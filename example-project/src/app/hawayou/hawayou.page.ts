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
import {CheckRequest} from '../core/domain/hwayou-api/CheckRequest';

@Component({
    selector: 'app-hawayou',
    templateUrl: './hawayou.page.html',
    styleUrls: ['./hawayou.page.scss'],
})
export class HawayouPage implements OnInit {
    public userDetail: UserDetail;

    constructor(private storage: Storage, private alertController: AlertController,
                public trans: TranslateService, private userService: UserService,
                public api: ApiService, private iab: InAppBrowser,
                public contentsService: ContentsService) {
        this.userService.onUserDetailChange().subscribe(it => {
            this.userDetail = it;
            this.flow();
        });
    }

    ngOnInit() {
    }

    private flow() {
        const check = new CheckRequest();
        check.code_service = '12005';
        check.user_id = this.userDetail.birthday+this.userDetail.phone;
        this.api.getHwayouApi(check).subscribe(it => {
            console.log(it);
        });
    }
}
