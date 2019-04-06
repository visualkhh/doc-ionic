import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
// import {File} from '@ionic-native/file/ngx';
@Component({
    selector: 'app-album',
    templateUrl: './album.page.html',
    styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
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

    public album: AlbumInfo;
    public playerTitle: string;
    @ViewChild('player') public player: ElementRef;

    ngOnInit() {
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
                this.file.resolveDirectoryUrl(directory).then( drit => {
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
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = content.c_url;
        const directory = this.getDirectory();
        const filePromise = new Promise((resolve, reject) => {
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
                reject();
                this.alertService.alert('not support');
            }
        });

        const loading = await this.presentLoading();
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
            entry.file(sit => {
                const reader = new FileReader();
                reader.onloadstart = (ev: ProgressEvent) => {
                    // console.log('1--' + reader.result + '  ' + ev);
                };
                reader.onloadend = (ev: ProgressEvent) => {
                    // console.log('2--' + reader.result + '  ' + ev);
                    // const audio = new Audio(reader.result as string);
                    // audio.play();
                    // https://www.w3schools.com/tags/av_event_canplaythrough.asp
                    this.player.nativeElement.pause();
                    this.player.nativeElement.src = reader.result as string;
                    this.player.nativeElement.play();
                    this.player.nativeElement.oncanplaythrough = () => {
                        loading.dismiss();
                    };
                };
                // The most important point, use the readAsDatURL Method from the file plugin
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
        const loading = await this.presentLoading();
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

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: await this.translateService.get('DOWNLOADING').toPromise(),
            // duration: 10000
        });
        await loading.present();

        // loading.onclose
        // const { role, data } = await loading.onDidDismiss();
        // console.log('Loading dismissed!');
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
                       // console.log('Confirm Cancel: blah');
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


}
