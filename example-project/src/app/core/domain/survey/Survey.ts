import {SurveyQuesionResearch} from '../../../../assets/surveys/SurveyQuesionResearch';
import {SuerveyQuestion} from './SuerveyQuestion';
import {SurveyAlgoResult} from './SurveyAlgoResult';
import {SurveyResult} from '../../../../assets/surveys/SurveyResult';
import * as moment from 'moment';
export class Survey extends SurveyQuesionResearch<SuerveyQuestion> {
    constructor() {
        super();
    }
    results: Array<SurveyResult>;
    reg_dt: string;
    set regDt(date: Date) {
        this.reg_dt = moment(date).format('YYYYMMDDHHmmss');
    }
    get regDt(): Date {
        return moment(this.reg_dt, 'YYYYMMDDHHmmss').toDate();
    }
    public sumSelectedGrade(): number {
        let sum = 0;
        for (const at  of this.r_questions) {
            sum += Number(at.selectedGrade);
        }
        return sum;
    }
    public algorithm(): SurveyAlgoResult {
        return null;
    }
}
