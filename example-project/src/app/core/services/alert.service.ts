import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/observable/of';
import {Device} from '@ionic-native/device/ngx';
import {AlertController, Platform} from '@ionic/angular';
import {UserService} from './user.service';

@Injectable()
export class AlertService {

constructor(private storage: Storage, private translateService: TranslateService, private userService: UserService,
            private alertController: AlertController,
            private http: HttpClient, private device: Device, public platform: Platform) {
}





    // https://demo.mobiscroll.com/angular/alerts-notifications/note#

    async alert(msgCode: string, head: string = 'DIALOG_TITLE_ALERT') {
        const header = head ? await this.translateService.get(head).toPromise() : undefined;
        // const subHeader = this.translateService.get('MSG_FIRMWARE_UPDATE_FAILURE').value;
        const msg = await this.translateService.get(msgCode).toPromise();
        const ok = await this.translateService.get('BTN_OK').toPromise();
        const cancel = await this.translateService.get('BTN_CANCEL').toPromise();
        // const value2 = await promise2(value1)
        const alert = await this.alertController.create({
            header: header,
            // subHeader: subHeader,
            message: msg,
            buttons: [ok]
        });

        await alert.present();
    }
}
