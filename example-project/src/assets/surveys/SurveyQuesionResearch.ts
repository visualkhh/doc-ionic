import {Question} from './Question';

export class SurveyQuesionResearch<T extends Question> {
    r_code: string; // : "R00002",
    r_title: string; // : "스트레스 자가 검사",
    r_guide: string; // : "평소 귀하의 상태에 해당되는 문항을 선택해 주세요.",
    r_questions: Array<T>; // s
}
