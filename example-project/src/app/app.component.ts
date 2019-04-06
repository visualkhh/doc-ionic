import {AfterViewInit, Component, OnChanges, OnInit, Renderer2, ViewChild} from '@angular/core';

import {AlertController, IonSlides, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
// import {Observable} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import {AppVersion} from '@ionic-native/app-version/ngx';
import 'rxjs-compat/add/observable/from';
// import 'rxjs-compat/add/operator/filter';
// import { Observable } from 'rxjs/internal/Observable';
// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
// import { map, filter, scan, tap } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {UserService} from './core/services/user.service';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {trigger, state, style, animate, transition, query} from '@angular/animations';
import {LangChangeEvent} from '@ngx-translate/core/lib/translate.service';
import {ApiService} from './core/services/api.service';
import {AlertService} from './core/services/alert.service';
import {UserDetail} from './core/domain/UserDetail';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.scss'],
    animations: [
        trigger('introState', [
            state('show', style({opacity: 1})),
            state('hide', style({opacity: 0})),
            transition('* => *', animate('.0s'))
            // transition('* => *', animate('.5s'))
        ])
    ]
})

// AfterViewInit  AfterViewChecked
export class AppComponent implements OnInit, OnChanges, AfterViewInit {
    public appPages = [
        {
            title: 'Home',
            url: '/home'
        },
        {
            title: 'SETTING_TEXT_01',
            url: '/clause'
        },
        {
            title: 'SETTING_TEXT_02',
            url: '/personal'
        },
        {
            title: 'SETTING_TEXT_03',
            action: 'version'
        },
        {
            title: 'CONTENTS_TITLE_13',
            action: 'guide'
        },
        // {
        //     title: 'List',
        //     url: '/list'
        // }
    ];

    showSplash = false;
    intro = false;
    introState = 'hide';
    introLast = false;
    lang: string = undefined;

    userDetail: UserDetail;
    slideOpts = {
        effect: 'flip'
    };
    @ViewChild(IonSlides) slides: IonSlides;

    // @ViewChild('introSlides') slider2: ElementRef;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translateService: TranslateService,
        private storage: Storage,
        private userService: UserService,
        private router: Router,
        private api: ApiService,
        private alertService: AlertService,
        private alertController: AlertController,
        private appVersion: AppVersion,
        private renderer: Renderer2
    ) {
        this.initializeApp();
    }

    initializeApp() {
        // console.log(this.translateService.getBrowserLang());
        // console.log(this.translateService.getLangs());

        this.platform.ready().then(() => {
            this.translateService.setDefaultLang('en');
            if (this.translateService.getBrowserLang() !== undefined) {
                this.translateService.use(this.translateService.getBrowserLang());
            } else {
                this.translateService.use('en'); // Set your language here
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();


            this.introShow();
            this.userService.onUserDetailChange().subscribe(it => {
                this.userDetail = it;
                // if (!it.login) {
                //     this.introShow();
                // }
            });
            // https://poiemaweb.com/angular-rxjs
            // from(this.userService.getUserDetail()).filter( it => null == it).subscribe(it => {
            //     this.intro = true;
            // });
            // this.intro = false;
            // from(this.userService.getUserDetail()).filter( it => null == it);
            // timer(1500).subscribe(() => { this.showSplash = false; });
            // timer(3000).subscribe(() => { this.introState = 'show'; });
            // this.userService.getUserDetail().then(it => {
            //    if (it) {
            //
            //    } else {
            //        this.intro = false;
            //        // this.intro = true;
            //        this.introState = 'show';
            //    }
            // });
        });


        // back
        // this.platform.backButton.subscribe(() => {
        //     // this.platform.
        // });
        // this.platform.registerBackButtonAction(() => {
        //     const overlay = this.app._appRoot._overlayPortal.getActive();
        //     const nav = this.app.getActiveNav();
        //     const closeDelay = 2000;
        //     const spamDelay = 500;
        //
        //     if(overlay && overlay.dismiss) {
        //         overlay.dismiss();
        //     } else if(nav.canGoBack()){
        //         nav.pop();
        //     } else if(Date.now() - this.lastBack > spamDelay && !this.allowClose) {
        //         this.allowClose = true;
        //         let toast = this.toastCtrl.create({
        //             message: this.translate.instant("general.close_toast"),
        //             duration: closeDelay,
        //             dismissOnPageChange: true
        //         });
        //         toast.onDidDismiss(() => {
        //             this.allowClose = false;
        //         });
        //         toast.present();
        //     } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
        //         this.platform.exitApp();
        //     }
        //     this.lastBack = Date.now();
        // });
    }

    async logOut() {
        const alert = await this.alertController.create({
            header: await this.translateService.get('MENU_LOGOUT').toPromise(),
            message: '<strong>' + await this.translateService.get('POPUP_TEXT_05').toPromise() + '</strong>',
            buttons: [
                {
                    text: await this.translateService.get('BTN_CANCEL').toPromise(),
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        // console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: await this.translateService.get('BTN_OK').toPromise(),
                    handler: () => {
                        this.userService.logOut();
                        this.alertService.alert('TOAST_TEXT_02');
                        this.router.navigate(['/home']);
                    }
                }
            ]
        });
        await alert.present();
    }

    ngOnInit() {
        // this.translateService.get('lang').subscribe(it => {
        //     console.log(this.lang);
        // });

        // this.userService.getUserDetail().then(it => this.userDetail = it);
        this.translateService.onLangChange.subscribe((it: LangChangeEvent) => {
            this.lang = it.lang;
            // this.api.getApiVersion();
        });
        // this.translateService.onTranslationChange.subscribe(it => {
        //    console.log(it);
        // });


        // timer(1000).subscribe(() => {
        //     this.userService.login();
        // });
    }

    ngAfterViewInit(): void {
        // this.showSplash = false;
    }

    ngOnChanges() {
        // this.visibility = this.isVisible ? 'shown' : 'hidden';
        // console.log("0------------------")
    }

    slideChanged() {
        // console.log(this.slider2.nativeElement)
        // console.log((this.slides as ElementRef).nativeElement)
        this.slides.ionSlideTouchEnd.subscribe(it => {
            // console.log('ionSlideTouchEnd' + it);
        });
        this.slides.isEnd().then(it => {
            console.log(it);
            this.introLast = it;
        });
        // this.slides.getActiveIndex
        // this.slides.ionSlideReachEnd
        // let currentIndex = this.slides.getActiveIndex();
        // console.log('Current index is', currentIndex);
        // // this.slides
        // IonSlides.is
    }

    introClose() {
        this.intro = false;
        this.introLast = false;
        this.introState = 'hide';
    }

    introShow() {
        this.intro = true;
        this.introLast = false;
        this.introState = 'show';
        // this.showSplash = false;
    }

    async action(action: string) {
        switch (action) {
            case 'version':
                const appName = await this.appVersion.getAppName().catch(_ => '-');
                const packageName = await this.appVersion.getPackageName().catch(_ => '-');
                const versionCode = await this.appVersion.getVersionCode().catch(_ => '-');
                const versionNumver = await this.appVersion.getVersionNumber().catch(_ => '-');
                const msg = `<ul style="text-align: left"><li>appName: ${appName}</li><li>packageName: ${packageName}</li><li>versionCode: ${versionCode}</li><li>versionNumver: ${versionNumver}</li></ul><p>Copyright: 2019 OmniC&S Inc.</p>`;
                this.alertService.alert(msg, 'MENU_APP_VER');
                break;
            case 'guide':
                this.introShow();
                break;
        }
    }
}
