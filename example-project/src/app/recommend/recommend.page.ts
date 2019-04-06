import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {AlertService} from '../core/services/alert.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {ApiService} from '../core/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../core/services/user.service';
import {Base64} from '@ionic-native/base64/ngx';
import {Downloader} from '@ionic-native/downloader/ngx';
import {ContentsService} from '../core/services/contents.service';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {UserDetail} from '../core/domain/UserDetail';
import {UserMeasNeuro} from '../core/domain/UserMeasNeuro';
import {UserMeasPulse} from '../core/domain/UserMeasPulse';
import {RecommendInfo} from '../core/domain/album/RecommendInfo';
import {AlbumContent} from '../core/domain/album/AlbumContent';

@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.page.html',
    styleUrls: ['./recommend.page.scss'],
})
export class RecommendPage implements OnInit {
    private reg_dt: string;
    private measPulse: UserMeasPulse;
    private measNeuro: UserMeasNeuro;
    private recommendPulses: RecommendInfo[];
    private recommendNeuros: RecommendInfo[];
    public contents: AlbumContent[];
    public playerTitle: string;
    @ViewChild('player') public player: ElementRef;
    public headTitle: string;

    constructor(private translateService: TranslateService,
                private storage: Storage,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private platform: Platform,
                private contensService: ContentsService,
                private loadingController: LoadingController,
                private downloader: Downloader,
                private fileOpener: FileOpener,
                private nativeAudio: NativeAudio,
                private alertService: AlertService,
                private alertController: AlertController,
                private http: HttpClient,
                private documentViewer: DocumentViewer,
                private base64: Base64,
                private transfer: FileTransfer, private file: File,
                private api: ApiService) {
    }

    ngOnInit() {
        this.reg_dt = this.route.snapshot.paramMap.get('pdt_ndt');
        const pulseDt = this.reg_dt.split('_')[0];
        const neuroDt = this.reg_dt.split('_')[1];
        this.userService.getUserMeasPulseByReg_Dt(pulseDt).then(it => {
            this.measPulse = it;
            this.recommendPulses = this.contensService.getRecommendInfos([this.measPulse.pulse_stress_cd, this.measPulse.heart_health_cd, this.measPulse.ans_active_cd, this.measPulse.fatigue_cd, this.measPulse.body_energy_cd]);
            return this.userService.getUserMeasNeuroByReg_Dt(neuroDt);
        }).then(it => {
            this.measNeuro = it;
            this.recommendNeuros = this.contensService.getRecommendInfos([this.measNeuro.concentration_cd, this.measNeuro.mental_cd, this.measNeuro.stress_cd, this.measNeuro.balance_cd]);
            this.makeContents();
        });
    }

    public makeContents() {
        let rat = new Array<RecommendInfo>();
        const diceEntries = new Set();
        if ((!this.recommendPulses || this.recommendPulses.length <= 0) && (!this.recommendNeuros || this.recommendNeuros.length <= 0)) {
            rat = rat.concat(this.contensService.recommendInfos);
            this.headTitle = 'HASNT_CAUTION';
        } else {
            rat = rat.concat(this.recommendPulses);
            rat = rat.concat(this.recommendNeuros);
            this.headTitle = 'HAV_ANY_CAUTION';
        }
        rat.forEach(it => it.contents.forEach(sit => diceEntries.add(sit.c_id)));
        this.contents = this.contensService.getAlbumContents(Array.from(diceEntries.values()));

        const directory = this.getDirectory();
        for (let i = 0; directory && i < this.contents.length; i++) {
            this.file.resolveDirectoryUrl(directory).then( drit => {
                this.file.getFile(drit, this.contents[i].c_title, {create: false, exclusive: false}).then(sit => {
                    this.contents[i].file = sit;
                }).catch(sit => {
                    this.contents[i].file = undefined;
                });
            });
        }
    }



    async presentLoading() {
        const loading = await this.loadingController.create({
            message: await this.translateService.get('DOWNLOADING').toPromise(),
        });
        await loading.present();
        return loading;
    }

    async downloadConfirm(content: AlbumContent) {
        const alert = await this.alertController.create({
            header: await this.translateService.get('DOWNLOAD_DIALOG_TITLE').toPromise(),
            message: await this.translateService.get('DOWNLOAD_CONFIRM').toPromise(),
            buttons: [
                {
                    text: await this.translateService.get('BTN_CANCEL').toPromise(),
                    role: 'cancel',
                    handler: (blah) => {
                    }
                }, {
                    text: await this.translateService.get('BTN_OK').toPromise(),
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.downloadAndPlay(content);
                    }
                }
            ]
        });
        await alert.present();
    }
    async downloadAndPlay(content: AlbumContent) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = content.c_url;
        const directory = this.getDirectory();
        const filePromise = new Promise((resolve, reject) => {
            if (content.file) {
                resolve(content.file);
            } else if (directory) {
                fileTransfer.download(url, this.getDirectory() + content.c_title).then((entry: FileEntry) => resolve(entry));
                fileTransfer.onProgress((progressEvent) => {
                });
            } else {
                reject();
                this.alertService.alert('not support');
            }
        });

        const loading = await this.presentLoading();
        filePromise.then((entry: FileEntry) => {
            content.file = entry;
            this.playerTitle = content.c_id;
            entry.file(sit => {
                const reader = new FileReader();
                reader.onloadstart = (ev: ProgressEvent) => {
                };
                reader.onloadend = (ev: ProgressEvent) => {
                    this.player.nativeElement.pause();
                    this.player.nativeElement.src = reader.result as string;
                    this.player.nativeElement.play();
                    this.player.nativeElement.oncanplaythrough = () => {
                        loading.dismiss();
                    };
                };
                reader.readAsDataURL(sit);
            }, err => {
                loading.dismiss();
                this.alertService.alert('NO_FILES');
            });
        }).catch(it => {
            loading.dismiss();
            this.alertService.alert('NO_FILES');
        });
    }
    private getDirectory() {
        return this.platform.is('ios') ? this.file.documentsDirectory : this.file.dataDirectory;
    }
}
