import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service';
import {ContentsService} from '../core/services/contents.service';
import {TranslateService} from '@ngx-translate/core';
import {Survey} from '../core/domain/survey/Survey';


export class LastSercey {
    count: number;
    lastSurvey: Survey;
}

@Component({
    selector: 'app-servey-history',
    templateUrl: './servey-history.page.html',
    styleUrls: ['./servey-history.page.scss'],
})
export class ServeyHistoryPage implements OnInit {
    private surveys: Survey[];

  constructor(public trans: TranslateService, private userService: UserService, public contentsService: ContentsService) {
      this.userService.onUserSurveyChange().subscribe(it => {
        this.surveys = it;
      });
  }

  ngOnInit() {
      console.log('ServeyHistoryPage onInit');
      // this.userService.getUserSurveys().then(it => {
      //     this.surveys = it;
      // });
  }

    public getCountAndLast(r_code: string): LastSercey {
        const lastSurvey = new LastSercey();
        lastSurvey.count = 0;
        for (let i = 0; this.surveys && i < this.surveys.length; i++) {
            if (this.surveys[i].r_code === r_code) {
                lastSurvey.count++;
                lastSurvey.lastSurvey = this.surveys[i];
            }
        }
        return lastSurvey;
    }
    public getServeys(r_code: string): Array<Survey> {
        const surveys = new Array<Survey>();
        for (let i = 0; this.surveys && i < this.surveys.length; i++) {
            if (this.surveys[i].r_code === r_code) {
                surveys.push(this.surveys[i]);
            }
        }
        return surveys;
    }

}
