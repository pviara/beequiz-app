import { QuizTheme } from './quiz-theme';

export class QuizParameters {
    constructor(
        readonly themes: QuizTheme[],
        readonly numberOfQuestions: number[],
    ) {}
}
