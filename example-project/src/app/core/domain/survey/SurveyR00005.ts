import {Survey} from './Survey';
import {SurveyAlgoResult} from './SurveyAlgoResult';

// 치매 선별 검사
export class SurveyR00005 extends Survey {
    constructor() {
        super();
    }

    // 안드로이드 김정석 선임이 만든 로직 그대로 포팅
    algorithm(): SurveyAlgoResult {
        let codePosition = 0;
        const selectedSum = this.sumSelectedGrade();


        if (selectedSum >= 0 && selectedSum <= 5) {
            codePosition = 0;
        } else if (selectedSum >= 6 && selectedSum <= 10) {
            codePosition = 1;
        } else if (selectedSum >= 11 && selectedSum <= 16) {
            codePosition = 2;
        } else if (selectedSum >= 17 && selectedSum <= 25) {
            codePosition = 3;
        } else if (selectedSum >= 26) {
            codePosition = 4;
        }

        // R00005_201 정상군
        // R00005_202 산만형
        // R00005_203 치매잠재형
        // R00005_204 치매증상군
        // R00005_205 중증치매증상군
        const result = Object.assign(new SurveyAlgoResult(), this.results[codePosition]);
        result.score = selectedSum;
        return result;
    }
}
