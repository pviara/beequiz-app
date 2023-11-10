export class Question {
    constructor(
        readonly id: number,
        readonly text: string,
        readonly answers: Answer[],
    ) {}
}

export class Answer {
    constructor(
        readonly id: number,
        readonly questionId: number,
        readonly text: string,
    ) {}
}

export class Quiz {
    constructor(
        readonly questions: Question[],
        readonly givenAnswers: Answer[],
    ) {}

    hasQuizBeenCompleted(): boolean {
        return this.givenAnswers.length === this.questions.length;
    }
}
