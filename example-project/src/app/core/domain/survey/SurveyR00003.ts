import {Survey} from './Survey';
import {SurveyAlgoResult} from './SurveyAlgoResult';

// 자살경향성 척도 검사
export class SurveyR00003 extends Survey {
    constructor() {
        super();
    }
    // 안드로이드 김정석 선임이 만든 로직 그대로 포팅
    algorithm(): SurveyAlgoResult {

        let codePosition = 0;
        const selectedSum = this.sumSelectedGrade();


        if (selectedSum >= 0 && selectedSum <= 5) {
            codePosition = 0;
        } else if (selectedSum >= 6 && selectedSum <= 9) {
            codePosition = 1;
        } else if (selectedSum >= 10) {
            codePosition = 2;
        }

        // R00003_201 정상군
        // R00003_202 주의군
        // R00003_203 위험군
        const result = Object.assign(new SurveyAlgoResult(), this.results[codePosition]);
        result.score = selectedSum;
        return result;
    }
}
