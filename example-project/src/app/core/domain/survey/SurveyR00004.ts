import {Survey} from './Survey';
import {SurveyAlgoResult} from './SurveyAlgoResult';

// 한국판 우울증 검사
export class SurveyR00004 extends Survey {
    constructor() {
        super();
    }
    // 안드로이드 김정석 선임이 만든 로직 그대로 포팅
    algorithm(): SurveyAlgoResult {
        let codePosition = 0;
        const selectedSum = this.sumSelectedGrade();


        if (selectedSum <= 20) {
            codePosition = 0;
        } else if (selectedSum >= 21 && selectedSum <= 40) {
            codePosition = 1;
        } else if (selectedSum >= 41) {
            codePosition = 2;
        }

        // R00004_201 정상군
        // R00004_202 주의군
        // R00004_203 위험군
        const result = Object.assign(new SurveyAlgoResult(), this.results[codePosition]);
        result.score = selectedSum;
        return result;
    }
}
