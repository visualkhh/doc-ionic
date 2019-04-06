import {SurveyQuesionResult} from './SurveyQuesionResult';
import {SurveyQuesionResearch} from './SurveyQuesionResearch';
import {Question} from './Question';

export class SurveyQuesion {
    researchs: Array<SurveyQuesionResearch<Question>>; // s
    results: Array<SurveyQuesionResult>; // s
}
