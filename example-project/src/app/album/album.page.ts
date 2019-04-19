import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {UserService} from '../core/services/user.service';
import {ApiService} from '../core/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ContentsService} from '../core/services/contents.service';
import {Observable, throwError, timer} from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/observable/of';
import {forkJoin} from 'rxjs';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
// import {fromArray} from 'rxjs/internal/observable/fromArray';
import {Media, MediaObject} from '@ionic-native/media/ngx';
import {fromArray} from 'rxjs-compat/observable/fromArray';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {HttpClient} from '@angular/common/http';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {AlertService} from '../core/services/alert.service';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {Content} from '../../assets/contents/Content';
import {Album} from '../../assets/contents/Album';
import {AlbumInfo} from '../core/domain/album/AlbumInfo';
import {AlbumContent} from '../core/domain/album/AlbumContent';
import {AlertController, Platform, LoadingController} from '@ionic/angular';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

// import {File} from '@ionic-native/file/ngx';
@Component({
    selector: 'app-album',
    templateUrl: './album.page.html',
    styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit, OnDestroy {
    public album: AlbumInfo;
    public playerTitle: string;
    @ViewChild('player') public player: ElementRef;
    public loadingDialog: any;
    public alertPopupStr: any = null;
    public lastPlayState: boolean;

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
                private localNotifications: LocalNotifications,
                private backgroundMode: BackgroundMode,
                private api: ApiService) {

        console.log('Album constructor' + route);
        // this.platform.pause.subscribe(() => {
        //     if (this.router.url.startsWith('/album')) {
        //         console.log('Album paused'); // do what you want to do here when the app is about to go in background
        //         this.lastPlayState = this.isPlaying();
        //         this.player.nativeElement.pause();
        //     }
        // });
        // this.platform.resume.subscribe(() => {
        //     if (this.router.url.startsWith('/album')) {
        //         console.log('Album resumed ' + this.lastPlayState );  // do what you want to do here when the app resumes or comes in foreground
        //         if (this.lastPlayState === true) {
        //             this.player.nativeElement.play();
        //         }
        //         this.lastPlayState = this.isPlaying();
        //     }
        // });
        this.platform.backButton.subscribeWithPriority(9999, () => {
            console.log('back!! album Page  ', this.router.url);
            if (this.router.url.startsWith('/album')) {
                if (this.loadingDialog && this.loadingDialog.isConnected === true) {
                    this.loadingDialog.dismiss();
                    return;
                }
                if (this.alertPopupStr != null && this.alertPopupStr.isConnected === true) {
                    this.alertPopupStr.dismiss();
                    return;
                }
                this.lastPlayState = this.isPlaying();
                if (this.lastPlayState === true) {
                    this.player.nativeElement.pause();
                }
                this.backgroundMode.disable();
                this.router.navigate(['/home']);

            }
        });
    }

    isPlaying(): boolean {
        if (this.player && this.player.nativeElement && this.player.nativeElement.currentTime > 0 && !this.player.nativeElement.paused && !this.player.nativeElement.ended && this.player.nativeElement.readyState > 2) {
            return true;
        } else {
            return false;
        }
    }

    // dismissPopup() {
    //     console.log('back!! dismissPopup  ' );
    //     if (this.loadingDialog) {
    //         this.loadingDialog.dismiss();
    //     }
    //     if (this.alertController) {
    //         this.alertController.dismiss();
    //     }
    // }
    ngOnDestroy() {
        console.log('Album ngOnDestroy');
        this.backgroundMode.disable();
        // if (this.alertController) {
        //     this.alertController.dismiss();
        // }
        // console.log('HomePage ngOnDestroy');
        // this.platform.pause.subscribe();
        // this.platform.resume.subscribe();
    }

    ngOnInit() {
        console.log('Album ngOnInit : ');
        const title = this.route.snapshot.paramMap.get('title');
        fromArray(this.contensService.albumInfos).filter((it: AlbumInfo) => {
            return it.c_title === title;
        }).map((it: AlbumInfo) => {
            const directory = this.getDirectory();
            for (let i = 0; directory && i < it.contents.length; i++) {
                // this.file.checkFile(directory, it.c_title).then(sit => {
                //     console.log('checkfile: ' + sit);
                //     it.contents[i].exists = sit;
                // }).catch(sit => {
                //     it.contents[i].exists = false;
                // });
                this.file.resolveDirectoryUrl(directory).then(drit => {
                    this.file.getFile(drit, it.contents[i].c_title, {create: false, exclusive: false}).then(sit => {
                        it.contents[i].file = sit;
                    }).catch(sit => {
                        it.contents[i].file = undefined;
                    });
                });
            }
            return it;
        }).subscribe(it => {
            this.album = it;
        });

        // console.log('------wwwwwww');
        if (window['CallTrap'] && window['CallTrap']['onCall']) {
            window['CallTrap']['onCall'](({state, number}) => {
                console.log(`album CHANGE STATE: ${state}`);
                switch (state) {
                    case window['CallTrap'].STATE.RINGING:
                        console.log('album Phone is ringing', number);
                        this.lastPlayState = this.isPlaying();
                        this.player.nativeElement.pause();
                        break;
                    case window['CallTrap'].STATE.OFFHOOK:
                        console.log('album Phone is off-hook');
                        break;
                    case window['CallTrap'].STATE.IDLE:
                        console.log('album Phone is idle  :  ' + this.lastPlayState);
                        if (this.lastPlayState === true) {
                            setTimeout(() => {
                                this.playMusic();
                            }, 2000);
                            return;
                        }
                        this.lastPlayState = this.isPlaying();
                        break;
                }
            });
        }
        // this.player.nativeElement.setAttribute('title','zz');
        // alert(this.player.nativeElement.getAttribute('title'));
        // Observable.of(fromArray(this.contensService.albums)).filter((it: Album) => {
        //     console.log('-----------asd-');
        //     return it.c_title === title;
        // }).subscribe(it => {
        //     console.log('------------')
        //     this.album = it;
        // });
        // console.log(this.route.snapshot.paramMap.get('title'));
        // this.route.paramMap.subscribe(params => {
        //     console.log(params.get('title'));
        // });
    }

    async playMusic() {
        console.log('Album timeout play');
        this.player.nativeElement.play();
        this.lastPlayState = this.isPlaying();
    }

//
//     play(content: Content) {
//         console.log(content.c_size);
//
//
//         // const request: DownloadRequest = {
//         //     uri: content.c_url,
//         //     title: 'MyDownload',
//         //     description: '',
//         //     mimeType: '',
//         //     visibleInDownloadsUi: true,
//         //     notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
//         //     destinationInExternalFilesDir: {
//         //         dirType: 'Downloads',
//         //         subPath: 'MyFile.apk'
//         //     }
//         // };
//         //
//         //
//         // this.downloader.download(request)
//         //     .then((location: string) => console.log('File downloaded at:' + 'aaa'))
//         //     .catch((error: any) => console.error(error));
//
//
//         // this.nativeAudio.preloadSimple('uniqueId1', '/assets/contents/ttaa.mp3').then(it => {
//         //     console.log('s ' + it);
//         // }, onError => {
//         //
//         //     console.log('b ' + onError);
//         // });
//         this.nativeAudio.preloadComplex('uniqueId1', 'assets/contents/ttaa.mp3', 1, 1, 0).then(it => {
//             console.log('s ' + it);
//         }, onError => {
//
//             console.log('b ' + onError);
//         });
//         // this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);
//
//         this.nativeAudio.play('uniqueId1').then(onSuccess => {
//
//             console.log('c ' + onSuccess);
//         }, onError => {
//             console.log('d ' + onError);
//
//         });
//
//         timer(16000).subscribe(() => {
//
//             this.nativeAudio.stop('uniqueId1').then(onSuccess => {
//                 console.log('e ' + onSuccess);
//             }, onError => {
//                 console.log('f ' + onError);
//             });
//         });
//
//
// // can optionally pass a callback to be called when the file is done playing
// //         this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
//
//         // this.nativeAudio.loop('uniqueId2').then(onSuccess, onError);
//
//         // this.nativeAudio.setVolumeForComplexAsset('uniqueId2', 0.6).then(onSuccess,onError);
//         //
//         // this.nativeAudio.stop('uniqueId1').then(onSuccess,onError);
//         //
//         // this.nativeAudio.unload('uniqueId1').then(onSuccess,onError);
//     }
//
//     go() {
//         // const audio = new Audio('http://music.omnicns.com/btamin/stress/CSR082.mp3');
//         // audio.play();
//         // console.log(audio.buffered);
//         // audio.onloadeddata = function() {
//         //     alert('Browser has loaded the current frame' + audio);
//         // };
//
//         // this.http.get('http://music.omnicns.com/btamin/stress/CSR082.mp3').subscribe(it=>{
//         //     console.log('000000' + it)
//         // })
//         // https://github.com/apache/cordova-plugin-file#where-to-store-files
//         const fileTransfer: FileTransferObject = this.transfer.create();
//         const url = 'http://music.omnicns.com/btamin/stress/CSR082.mp3';
//         fileTransfer.download(url, this.file.dataDirectory + 'CSR082.mp3').then((entry) => {
//             console.log('download complete: ' + entry.toURL());
//             this.alertService.alert('download complete: ' + entry.toURL());
//             // const audio = new Audio(entry.toURL());
//             // audio.play();
//             this.lasturl = entry.toURL();
//         }, (error) => {
//             console.log('download error: ' + error);
//             this.alertService.alert('download error: ' + error);
//             // handle error
//         });
//
//     }
//
//     ga() {
//         const audio = new Audio(this.lasturl);
//         this.alertService.alert(location.href);
//         try {
//             // const audio = new Audio('file:///Users/visualkhh/source/omnicns/personal-mindcare-webapp/src/assets/contents/ttaa.mp3');
//             audio.play();
//         } catch (e) {
//             this.alertService.alert(e);
//         }
//     }
//
//     igo() {
//         // const audio = new Audio('http://music.omnicns.com/btamin/stress/CSR082.mp3');
//         // audio.play();
//         // console.log(audio.buffered);
//         // audio.onloadeddata = function() {
//         //     alert('Browser has loaded the current frame' + audio);
//         // };
//
//         // this.http.get('http://music.omnicns.com/btamin/stress/CSR082.mp3').subscribe(it=>{
//         //     console.log('000000' + it)
//         // })
//         // https://github.com/apache/cordova-plugin-file#where-to-store-files
//         const fileTransfer: FileTransferObject = this.transfer.create();
//         // const url = 'https://ssl.pstatic.net/static/newsstand/up/2016/0325/nsd18522899.png';
//         const url = 'http://devdactic.com/html/5-simple-hacks-LBT.pdf';
//         const directory = this.platform.is('ios') ? this.file.documentsDirectory : this.file.dataDirectory;
//         fileTransfer.download(url, directory + '5-simple-hacks-LBT.pdf').then((entry) => {
//             console.log('download complete: ' + entry.toURL());
//             this.alertService.alert('download complete: ' + entry.toURL());
//             // const audio = new Audio(entry.toURL());
//             // audio.play();
//             // entry.
//             this.lasturl = entry.toURL();
//             // this.playgo(this.lasturl);
//
//             this.base64.encodeFile(entry.toURL()).then((base64File: string) => {
//                 console.log(base64File);
//             }, (err) => {
//                 console.log(err);
//             });
//
//
//             if (this.platform.is('ios')) {
//                 this.documentViewer.viewDocument(entry.toURL(), 'application/pdf', {});
//             } else {
//                 this.fileOpener.open(entry.toURL(), 'application/pdf');
//             }
//         }, (error) => {
//             console.log('download error: ' + error);
//             this.alertService.alert('download error: ' + error);
//             // handle error
//         });
//
//     }
//
//
    async downloadAndPlay(content: AlbumContent) {
        // const loading = await this.alertService.loading('HISTORY_LIST_FOOTER_TEXT');
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = content.c_url;
        const appName = await this.translateService.get('app_name').toPromise();
        const contentTitle = await this.translateService.get(content.c_id + '_c_title').toPromise();
        const directory = this.getDirectory();


        // if (cordova.plugins['backgroundMode']) {
        //     cordova.plugins['backgroundMode'].setDefaults({
        //         title: await this.translateService.get('app_name').toPromise(),
        //         text: await this.translateService.get(content.c_id + '_c_title').toPromise(),
        //         // icon?: string;
        //         // color?: string;
        //         // resume?: boolean;
        //         // hidden?: boolean;
        //         // bigText?: boolean;
        //         // ticker?: string;
        //         silent: false
        //     });
        //     cordova.plugins['backgroundMode'].enable();
        //     cordova.plugins['backgroundMode'].on('activate', (...args: any[]) => {
        //         console.log('activite sound background ', args);
        //     });
        // }

        let audioTypeStr = null;

        if (content.file) {
            this.loadingDialog = await this.alertService.loading('HISTORY_LIST_FOOTER_TEXT');
            audioTypeStr = 'playing';
        } else if (directory) {
            this.loadingDialog = await this.alertService.loading('DOWNLOADING');
            audioTypeStr = 'downLoadPlaying';
        }
        const loading = this.loadingDialog;
        const filePromise = new Promise((resolve, reject) => {
            console.log('promise ', content.file, directory);
            if (content.file) {
                resolve(content.file);
            } else if (directory) {
                fileTransfer.download(url, this.getDirectory() + content.c_title).then((entry: FileEntry) => resolve(entry));
                // https://forum.ionicframework.com/t/when-the-file-is-downloaded-i-want-to-show-progress-bar/124244/2
                fileTransfer.onProgress((progressEvent) => {
                    // console.log(progressEvent);
                    // var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    // this.progress = perc;
                });
            } else {
                reject({message: 'not support'});
            }
        });

        filePromise.then((entry: FileEntry) => {
            // this.alertService.alert('download complete: ' + entry.toURL());
            // console.log('download complete: ' + entry.toURL());
            content.file = entry;
            // loading.dismiss();
            // const audio = new Audio(entry.toURL());
            // audio.play();
            // entry.filesystem.toJSON();

            // const getURL = entry.toURL();
            this.playerTitle = content.c_id;
            console.log('filePromise then ', this.playerTitle);
            entry.file(sit => {
                const reader = new FileReader();
                reader.onloadstart = (ev: ProgressEvent) => {
                    // console.log('1--' + reader.result + '  ' + ev);
                };
                reader.onloadend = (ev: ProgressEvent) => {
                    console.log('audio onloadend ', ev);
                    // console.log('2--' + reader.result + '  ' + ev);
                    // const audio = new Audio(reader.result as string);
                    // audio.play();

                    // if (this.platform.is('android')) {
                    //     this.player.nativeElement.onplay = () => {
                    //         this.localNotifications.setDefaults({
                    //             vibrate: false,
                    //             foreground: true
                    //         });
                    //
                    //         this.localNotifications.schedule({
                    //             id: 1,
                    //             title: appName,
                    //             text: contentTitle,
                    //             data: { content: content },
                    //             sound: null,
                    //             foreground: true,
                    //             vibrate: false
                    //         });
                    //     };
                    // }
                    this.backgroundMode.setDefaults({
                        title: appName,
                        text: contentTitle
                        // icon?: string;
                        // color?: string;
                        // resume?: boolean;
                        // hidden?: boolean;
                        // bigText?: boolean;
                        // ticker?: string;
                        // silent?: boolean;
                    });
                    this.backgroundMode.enable();
                    this.backgroundMode.on('activate', (...args: any[]) => {
                        console.log('activite sound background ', args);
                    }).subscribe(itback => {
                        console.log('activite sound background  itback', itback);
                    });
                    // https://www.w3schools.com/tags/av_event_canplaythrough.asp
                    this.player.nativeElement.pause();
                    this.player.nativeElement.src = reader.result as string;
                    this.player.nativeElement.play();
                    this.player.nativeElement.oncanplaythrough = () => {
                        loading.dismiss();
                        if (audioTypeStr === 'downLoadPlaying') {
                            this.player.nativeElement.pause();
                        }
                    };
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(sit);
            }, err => {
                if (loading && loading.isConnected === true) {
                    loading.dismiss();
                }
                this.alertService.alert('NO_FILES');
            });

        }).catch(it => {
            if (loading && loading.isConnected === true) {
                loading.dismiss();
            }
            if (it && it.message) {
                this.alertService.alert(it.message);
            } else {
                this.alertService.alert('NO_FILES');
            }
        });
    }

    private getDirectory() {
        return this.platform.is('ios') ? this.file.documentsDirectory : this.file.dataDirectory;
    }

    async downloadToPlay(content: Content) {
        // const audio = new Audio('http://music.omnicns.com/btamin/stress/CSR082.mp3');
        // audio.play();
        // console.log(audio.buffered);
        // audio.onloadeddata = function() {
        //     alert('Browser has loaded the current frame' + audio);
        // };

        // this.http.get('http://music.omnicns.com/btamin/stress/CSR082.mp3').subscribe(it=>{
        //     console.log('000000' + it)
        // })
        // https://github.com/apache/cordova-plugin-file#where-to-store-files
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = content.c_url;
        const directory = this.getDirectory();
        const loading = await this.alertService.loading('HISTORY_LIST_FOOTER_TEXT');
        fileTransfer.download(url, directory + content.c_title).then((entry: FileEntry) => {
            console.log('download complete: ' + entry.toURL());
            this.alertService.alert('download complete: ' + entry.toURL());
            loading.dismiss();
            // const audio = new Audio(entry.toURL());
            // audio.play();
            // entry.filesystem.toJSON();

            // const getURL = entry.toURL();
            entry.file(sit => {
                const reader = new FileReader();
                reader.onloadstart = (ev: ProgressEvent) => {
                    // console.log('1--' + reader.result + '  ' + ev);
                };
                reader.onloadend = (ev: ProgressEvent) => {
                    loading.dismiss();
                    console.log('2--' + reader.result + '  ' + ev);
                    const audio = new Audio(reader.result as string);
                    audio.play();
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(sit);
            }, err => {
                loading.dismiss();
            });


            // this.file.checkFile(directory, content.c_title).then(it => {
            //     console.log('checkfile: ' + it);
            // })
            // this.file.readAsDataURL(directory, content.c_title).then(it => {
            //     // console.log('readAsDataURL: ' + it);
            //     const audio = new Audio(it);
            //     audio.play();
            // })


            // this.file.createFile(directory, content.c_title + '_', true).then(it => {
            //     console.log('createFile: ' + it.fullPath);
            // })
            // this.file.removeFile(directory, content.c_title + '_').then(it => {
            //     console.log('removeFile: ' + it);
            // })
            console.log('file: ');
            // this.fileOpener.open(getURL, 'audio/mpeg');
            // this.lasturl = entry.toURL().replace('file://', '');
            // this.playgo(content.c_title, this.lasturl);
            // this.base64.encodeFile(entry.toURL()).then((base64File: string) => {
            //     console.log(base64File);
            // }, (err) => {
            //     console.log(err);
            // });
        }, (error) => {
            console.log('download error: ' + error);
            this.alertService.alert('download error: ' + error);
            // handle error
        });

    }


    playgo(title: string, path: string) {
        // https://stackoverflow.com/questions/44885809/how-to-read-audio-file-using-cordova-file-system
        // play
        // FileReader
        // this.nativeAudio.preloadComplex()
        this.nativeAudio.preloadComplex(title, path, 1, 1, 0).then(it => {
            console.log('s ' + it);
        }, onError => {

            console.log('b ' + onError);
        });
        // this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);

        this.nativeAudio.play(title).then(onSuccess => {

            console.log('c ' + onSuccess);
        }, onError => {
            console.log('d ' + onError);

        });

        timer(10000).subscribe(() => {

            this.nativeAudio.stop(title).then(onSuccess => {
                console.log('e ' + onSuccess);
            }, onError => {
                console.log('f ' + onError);
            });
        });
    }

    playBack() {
        // https://stackoverflow.com/questions/44885809/how-to-read-audio-file-using-cordova-file-system
        // play
        // FileReader
        // this.nativeAudio.preloadComplex()
        // const title = 'titi';
        // this.nativeAudio.preloadComplex(title, 'assets/fafa.mp3', 1, 1, 0).then(it => {
        // this.nativeAudio.preloadSimple(title, 'assets/fafa.mp3').then(it => {
        //     console.log('s ' + it);
        // }, onError => {
        //
        //     console.log('b ' + onError);
        // });
        // this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);


        // this.backgroundMode.enable();
        // this.backgroundMode.on('activate', () => {}).subscribe(itback => {
        //     this.nativeAudio.play(title).then(onSuccess => {
        //         console.log('c ' + onSuccess);
        //     }, onError => {
        //         console.log('d ' + onError);
        //     });
        //     timer(15000).subscribe(() => {
        //
        //         this.nativeAudio.stop(title).then(onSuccess => {
        //             console.log('e ' + onSuccess);
        //         }, onError => {
        //             console.log('f ' + onError);
        //         });
        //     });
        // });

        // this.nativeAudio.play(title, () => console.log('audio1 is done playing'));

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
                        console.log('Confirm Cancel: blah');
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
        this.alertPopupStr = alert;
        await alert.present();
    }


}
