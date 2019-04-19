import {AfterViewInit, Component, NgZone, OnChanges, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';

import {
    ActionSheetController,
    AlertController,
    IonRouterOutlet,
    IonSlides,
    MenuController, ModalController,
    Platform,
    PopoverController, ToastController
} from '@ionic/angular';
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
import {NavigationEnd, Router} from '@angular/router';
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
            title: 'home',
            url: ['/home']
        },
        {
            title: 'SETTING_TEXT_01',
            url: ['/clause']
        },
        {
            title: 'SETTING_TEXT_02',
            url: ['/personal']
        },
        {
            title: 'SETTING_TEXT_03',
            action: 'version'
        },
        {
            title: 'CONTENTS_TITLE_13',
            url: ['/guide', 'none']
        },
        // {
        //     title: 'List',
        //     url: '/list'
        // }
    ];

    showSplash = true;
    introState = 'hide';
    introType = '';
    lang: string = undefined;

    userDetail: UserDetail;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
    // @ViewChild('introSlides') slider2: ElementRef;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

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
        private renderer: Renderer2,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        public toastController: ToastController,
        public modalCtrl: ModalController,
        private menu: MenuController,
        private ngZone: NgZone,
    ) {
        console.log('app constructor');
        this.initializeApp();
    }

    initializeApp() {
        // console.log(this.translateService.getBrowserLang());
        // console.log(this.translateService.getLangs());

        this.platform.ready().then(() => {

            this.platform.pause.subscribe(() => {
                // console.log('App paused'); // do what you want to do here when the app is about to go in background
            });

            this.platform.resume.subscribe(() => {
                // console.log('App resumed');  // do what you want to do here when the app resumes or comes in foreground
            });

            this.translateService.setDefaultLang('en');
            if (this.translateService.getBrowserLang() !== undefined) {
                this.translateService.use(this.translateService.getBrowserLang());
            } else {
                this.translateService.use('en'); // Set your language here
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();



            this.userService.onUserDetailChange().subscribe(it => {
                this.userDetail = it;
                // if (!it.login) {
                //     this.introShow();
                // }
            });


            // let status bar overlay webview
            this.statusBar.overlaysWebView(false);
            // set status bar to white
            // this.statusBar.
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString('#000');
            // this.statusBar.styleBlackOpaque();
            // https://poiemaweb.com/angular-rxjs
            // from(this.userService.getUserDetail()).filter( it => null == it).subscribe(it => {
            //     this.intro = true;
            // });
            // this.intro = false;
            // from(this.userService.getUserDetail()).filter( it => null == it);
            timer(1500).subscribe(() => { this.showSplash = false; });
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
        this.router.events.subscribe(event => {
            // console.log('home route event', event);

            // console.log(this.routerOutlets);
            if (event instanceof NavigationEnd && (event.url === '/home')) {
                // this.scrollLeft(0);
                this.setBackbuttonEvent();
            }
        });
        this.setBackbuttonEvent();
       // this.backButtonEvent();
       // this.backButtonEvent2();
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
                        // this.alertService.alert('TOAST_TEXT_02');
                        this.router.navigate(['/home']);
                    }
                }
            ]
        });
        await alert.present();
    }

    ngOnInit() {
        // console.log('AppComponent ogOnInit', this.routerOutlet);
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
        // console.log('app ngAfterViewInit');
        // this.showSplash = false;
    }

    ngOnChanges() {
        // console.log('app ngOnChanges');
        // this.visibility = this.isVisible ? 'shown' : 'hidden';
        // console.log("0------------------")
    }

    async action(action: string) {
       // console.log('action : ' + action +"    /  " + (action === 'version') + "   //  " + JSON.stringify(this.appVersion.getAppName()))
        switch (action) {
            case 'version':
                // const appName = await this.appVersion.getAppName().catch(_ => '-');
                // const packageName = await this.appVersion.getPackageName().catch(_ => '-');
                const versionCode = await this.appVersion.getVersionCode().catch(_ => '-');
                const versionNumver = await this.appVersion.getVersionNumber().catch(_ => '-');
                const msg = `<div style="text-align: left; padding-left: 1.5em "><p>versionCode: ${versionCode}</p><p>versionNumver: ${versionNumver}</p></div><p>Copyright: 2019 OmniC&S Inc.</p>`;
                this.alertService.alert(msg, 'MENU_APP_VER');
                break;
        }
    }

    setBackbuttonEvent() {
       // this.platform.backButton.subscribeWithPriority(0, () => {
       this.platform.backButton.subscribeWithPriority(9999, () => {
           // console.log('app backButtonEvent', this.routerOutlet)
           // if (this.intro) {
           //     Observable.create(observer => {
           //         this.ngZone.run(() => {
           //             this.introClose();
           //         });
           //     }).subscribe(i2t => {
           //     });
           // } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
           //     this.routerOutlet.pop();
           // }

           if (this.router.url === '/home') {
               if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                   // this.platform.exitApp(); // Exit from app
                   navigator['app'].exitApp(); // work in ionic 4

               } else {
                   this.alertService.toast('APP_BACK', 'bottom');
                   this.lastTimeBackPress = new Date().getTime();
               }
           }
           // } else if (this.router.url.startsWith('/album')) {
           //     if (this.alertController) {
           //         this.alertController.dismiss();
           //     }
           //     this.router.navigate(['/home']);
           // // } else if (this.router.url.startsWith('/servey-result')) {
           // //     this.router.navigate(['/home']);
           // } else {
           //     // this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
           // }
           if (this.routerOutlet && this.routerOutlet.canGoBack()) {
               this.routerOutlet.pop();
           }
       });
   }
   // backButtonEvent2() {
   //      this.platform.backButton.subscribe(async () => {
   //          // console.log('back!! appcomponent', this.router.url);
   //          // close action sheet
   //          try {
   //              const element = await this.actionSheetCtrl.getTop();
   //              if (element) {
   //                  element.dismiss();
   //                  return;
   //              }
   //          } catch (error) {
   //          }
   //
   //          // close popover
   //          try {
   //              const element = await this.popoverCtrl.getTop();
   //              if (element) {
   //                  element.dismiss();
   //                  return;
   //              }
   //          } catch (error) {
   //          }
   //
   //          // close modal
   //          try {
   //              const element = await this.modalCtrl.getTop();
   //              if (element) {
   //                  element.dismiss();
   //                  return;
   //              }
   //          } catch (error) {
   //              console.log(error);
   //
   //          }
   //
   //          // close side menua
   //          try {
   //              const element = await this.menu.getOpen();
   //              if (element) {
   //                  this.menu.close();
   //                  return;
   //
   //              }
   //
   //          } catch (error) {
   //
   //          }
   //
   //          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
   //              if (outlet && outlet.canGoBack()) {
   //                  outlet.pop();
   //
   //              } else if (this.router.url === '/home') {
   //                  if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
   //                      // this.platform.exitApp(); // Exit from app
   //                      navigator['app'].exitApp(); // work in ionic 4
   //
   //                  } else {
   //                      this.alertService.toast('APP_BACK');
   //                      this.lastTimeBackPress = new Date().getTime();
   //                  }
   //              }
   //          });
   //      });
   //  }
}
