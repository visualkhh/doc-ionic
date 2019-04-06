import {Survey} from './Survey';
import {SurveyAlgoResult} from './SurveyAlgoResult';

// 스트레스 자가진단
export class SurveyR00002 extends Survey {

    constructor() {
        super();
    }

    // 안드로이드 김정석 선임이 만든 로직 그대로 포팅
    algorithm(): SurveyAlgoResult {

        const selectedSum = this.sumSelectedGrade();

        let grade_01 = 0; // 신체상의 징후
        let grade_02 = 0; // 행동상의 징후
        let grade_03 = 0; // 심리감정상의 징후

        for (let i = 0; i < this.r_questions.length; i++) {
            // 1 ~ 10 -> 신체상의 징후
            if (i >= 0 && i <= 9) {
                grade_01 += this.r_questions[i].selectedGrade;
            }
            // 11 ~ 20 -> 행동상의 징후
            if (i >= 10 && i <= 19) {
                grade_02 += this.r_questions[i].selectedGrade;
            }
            // 21 ~ 30 -> 심리감정상의 징후
            if (i >= 20 && i <= 29) {
                grade_03 += this.r_questions[i].selectedGrade;
            }
        }

        const code = new Array<string>();
        let codePosition = 0;
        if (grade_01 < 4) {
            codePosition = 0;
        } else  if (grade_01 >= 4) {
            codePosition = 1;
        }
        code.push(this.results[codePosition].result_code);

        if (grade_02 < 4) {
            codePosition = 0;
        } else if (grade_02 >= 4) {
            codePosition = 1;
        }
        code.push(this.results[codePosition].result_code);

        if (grade_03 < 4 ) {
            codePosition = 0;
        } else if (grade_03 >= 4) {
            codePosition = 1;
        }
        code.push(this.results[codePosition].result_code);

        const result = Object.assign(new SurveyAlgoResult(), (code.includes('R00002_202') ? this.results[1] : this.results[0]));
        result.score = selectedSum;
        // R00002_201 정상군
        // R00002_202 위험군
        return result;
    }
}
