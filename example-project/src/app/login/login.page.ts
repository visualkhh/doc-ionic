import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {UserDetail} from '../core/domain/UserDetail';
import {AES256Crypto} from '../core/security/AES256Crypto';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {UserService} from '../core/services/user.service';
import {AlertService} from '../core/services/alert.service';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
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
import {ResponseHead} from '../core/domain/api/ResponseHead';
import {ErrorCode} from '../core/code/ErrorCode';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterContentInit, AfterViewInit {

    public userDetail: UserDetail;
    formGroup: FormGroup;
    // phone: AbstractControl;
    // birthday: AbstractControl;

    constructor(private formBuilder: FormBuilder, private userService: UserService,
                private alertSercice: AlertService,
                private router: Router, routeActive: ActivatedRoute) {
        // console.log('-------- ' + formBuilder);
        // this.formGroup = this.formBuilder.group({
        //     phone: new FormControl('', Validators.required),
        //     birthday: new FormControl('', Validators.compose([
        //         Validators.required,
        //         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        //     ]))
        // });
        // this.router.routeReuseStrategy.shouldReuseRoute = function() {
        //     return false;
        // };


        // https://github.com/angular/angular/issues/20112
        // router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         this.ngOnInit();
        //     }
        //     Instance of should be:
        //     NavigationEnd
        //     NavigationCancel
        //     NavigationError
        //     RoutesRecognized
        // });

        this.formGroup = this.formBuilder.group({
            birthday: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]+')
            ])),
            phone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])),
            autoLogin: new FormControl(true)
        });
        // this.formGroup = this.formBuilder.group({
        //     phone: [null, Validators.required],
        //     birthday: [null, Validators.required]
        // });
        // this.formGroup = this.formBuilder.group({
        //     birthday: [null, Validators.required],
        //     phone: [null, Validators.required, Validators.min(), Validators.max()]
        // });
        // this.userDetail.phone = this.formGroup.controls['phone'];
        this.userDetail = new UserDetail();
        this.userService.onUserDetailChange().subscribe(it => {
            this.userDetail = it;
            // this.userDetail.autoLogin = true;
        });
    }

    ngOnInit() {
        // console.log('login ngOnInit');
        // this.userService.onUserDetailChange().subscribe(it => {
        //     this.userDetail = it;
        // });
        // this.formGroup.get('birthday').valueChanges.subscribe(it => {
        //    console.log('birthday : ' + it);
        // });
        // this.formGroup.get('phone').valueChanges.subscribe(it => {
        //    console.log('phone : ' + it);
        // });
    }

    ngAfterContentInit() {
        // console.log('212');

    }

    ngAfterViewInit() {
        // console.log('22');
    }

    // async presentAlertConfirm() {
    //     const alert = await this.alertController.create({
    //         header: 'Confirm!',
    //         message: 'Message <strong>text</strong>!!!',
    //         buttons: [
    //             {
    //                 text: 'Cancel',
    //                 role: 'cancel',
    //                 cssClass: 'secondary',
    //                 handler: (blah) => {
    //                     console.log('Confirm Cancel: blah');
    //                 }
    //             }, {
    //                 text: 'Okay',
    //                 handler: () => {
    //                     console.log('Confirm Okay');
    //                 }
    //             }
    //         ]
    //     });
    //
    //     await alert.present();
    // }


    logout() {
        this.userService.logOut();
        this.router.navigate(['/home']);
        // this.router.navigateByUrl('/home');
    }

    submit(data: UserDetail) {
        // console.log(this.userDetail.phone);
        // const e = new AES256Crypto().encode(this.userDetail.phone);
        // console.log('e: ' + e);
        // console.log('d: ' + new AES256Crypto().decode(e));
        // console.log(data.phone);
        // const e = new AES256Crypto().encode(data.phone);
        // console.log('e: ' + e);
        // console.log('d: ' + new AES256Crypto().decode(e));
        this.userService.login(data.birthday, data.phone, data.autoLogin ? true : false).then(it => {
            if (it) {
                this.router.navigate(['/home']);
            } else {
                // this.tran
                this.alertSercice.alert('99999', 'logindFail');
            }
        }).catch((err: ResponseHead) => {
            // console.log('error ' + err);
            // console.log('error ' + ErrorCode[err.result_code]);
            this.alertSercice.alert(err.result_code.toString(), 'logindFail');

        });
    }

    // autoLoginP(autoLogin: boolean) {
    //     console.log(autoLogin);
    //     console.log(this.userDetail.autoLogin);
    // }
}
