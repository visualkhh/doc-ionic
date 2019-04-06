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
import {SurveyResult} from '../../assets/surveys/SurveyResult';
import {SurveyQuesionResearch} from '../../assets/surveys/SurveyQuesionResearch';
import {Question} from '../../assets/surveys/Question';

@Component({
    selector: 'app-servey-result',
    templateUrl: './servey-result.page.html',
    styleUrls: ['./servey-result.page.scss'],
})
export class ServeyResultPage implements OnInit {
    private code: string;
    public result: SurveyResult;
    public title: string;
    public research: SurveyQuesionResearch<Question>;
    constructor(public contentsService: ContentsService, public trans: TranslateService, private userService: UserService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) {
    }

    ngOnInit() {
        console.log('ServeyResultPage onInit');
        this.code = this.route.snapshot.paramMap.get('code');
        this.research = this.contentsService.getSurveyQuesionResearchByCode(this.code.split('_')[0]);
        this.result = this.contentsService.getSurveyResultByCode(this.code);
    }

    back() {
        alert(1);
    }
}
