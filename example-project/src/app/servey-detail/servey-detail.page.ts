import {UserService} from '../core/services/user.service';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentsService} from '../core/services/contents.service';
import {fromArray} from 'rxjs-compat/observable/fromArray';
import {forkJoin} from 'rxjs';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/observable/of';
import {Survey} from '../core/domain/survey/Survey';
import {AlertService} from '../core/services/alert.service';
import {timer} from 'rxjs';
import {SuerveyQuestion} from '../core/domain/survey/SuerveyQuestion';
import {ToastController} from '@ionic/angular';
@Component({
    selector: 'app-servey-detail',
    templateUrl: './servey-detail.page.html',
    styleUrls: ['./servey-detail.page.scss'],
})
export class ServeyDetailPage implements OnInit {

    public data: Survey;
    public code: string;
    public position: number;
    // public unit: number;
    constructor(public contentsService: ContentsService, public trans: TranslateService, public toastController: ToastController,
                private userService: UserService, private router: Router, private route: ActivatedRoute,
                private alertService: AlertService) {
    }

    ngOnInit() {
        console.log('servey-detail onInit');
        this.position = 0;
        this.code = this.route.snapshot.paramMap.get('code');
        this.data = this.contentsService.getMakeSurvey(this.code);
        for (let i = 0; i < this.data.r_questions.length; i++) {
            console.log(this.data.r_questions[i].selectedGrade);
        }
        // fromArray(this.contentsService.surveys).filter(it => it.r_code === this.code).subscribe(it => this.data = Object.assign(new Survey(), it));
    }

    public selectedNext(qu: SuerveyQuestion, grade: number) {
        qu.selectedGrade = grade;
        timer(200).subscribe(_ => this.next());
    }
    // public next(data?: number) {
    public next() {

        // this.unit = String(this.data.r_questions[this.position].selectedGrade);
        // console.log(this.data, this.unit);
        // if (undefined !== data) {
        //     this.data.r_questions[this.position].selectedGrade = data;
        // }
        if (undefined === this.data.r_questions[this.position].selectedGrade) {
            this.presentToast();
            return;
        }
        const nextPosition = this.position + 1;
        if (nextPosition >= this.data.r_questions.length) {
            this.data.regDt = new Date();
            this.userService.addUserSurvey(this.data).then(_ => {
                const result = this.data.algorithm().result_code;
                // this.data = this.contentsService.getMakeSurvey(this.code);
                // this.position = 0;
                this.router.navigate(['/servey-result', result]);
            });
            // this.router.navigateByUrl('/home');
        } else {
            this.position = Math.min(nextPosition, this.data ? this.data.r_questions.length - 1 : 0);
        }
    }
    public previous() {
        // this.unit = String(this.data.r_questions[this.position].selectedGrade);
        // console.log(this.data, this.unit);
        this.position = Math.max(this.position - 1, 0);
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: await this.trans.get('selectedItem').toPromise(),
            position: 'top',
            duration: 1500
        });
        toast.present();
    }

}
