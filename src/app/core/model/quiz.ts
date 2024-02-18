export class Question {
    constructor(
        readonly id: string,
        readonly label: string,
        readonly answers: Answer[],
    ) {}
}

export class Answer {
    constructor(
        readonly id: string,
        readonly label: string,
        readonly isCorrect?: true,
    ) {}
}

export class QuizScoreEvaluation {
    constructor(
        readonly score: number,
        readonly questionsLength: number,
    ) {}

    isScoreBad(): boolean {
        return this.score < this.questionsLength / 2;
    }

    isScoreGood(): boolean {
        return this.score > this.questionsLength / 2;
    }

    isScoreMedium(): boolean {
        return this.score === this.questionsLength / 2;
    }
}

export class Quiz {
    private currentQuestionIndex = 0;

    private givenAnswers: string[] = [];

    private score = 0;

    constructor(readonly questions: Question[]) {}

    formatCurrentStepPaginator(): string {
        return `${this.currentQuestionIndex + 1}/${this.questions.length}`;
    }

    formatScoreMessage(): string {
        return `${this.score}/${this.questions.length}`;
    }

    getCurrentQuestionAnswers(): Answer[] {
        return this.getCurrentQuestion().answers;
    }

    getCurrentQuestionId(): string {
        return this.getCurrentQuestion().id;
    }

    getCurrentQuestionLabel(): string {
        return this.getCurrentQuestion().label;
    }

    getScoreEvaluation(): QuizScoreEvaluation {
        return new QuizScoreEvaluation(this.score, this.questions.length);
    }

    goToNextQuestion(): void {
        this.currentQuestionIndex++;
    }

    hasQuizBeenCompleted(): boolean {
        return this.givenAnswers.length === this.questions.length;
    }

    isGivenAnswerCorrect(answerId: string): boolean {
        const correctAnswer = this.getCurrentQuestionCorrectAnswer();
        return correctAnswer.id === answerId;
    }

    isInProgress(): boolean {
        return this.givenAnswers.length < this.questions.length;
    }

    handleScoreForAnswer(answerId: string, isCorrect: boolean): void {
        this.givenAnswers.push(answerId);
        if (isCorrect) {
            this.increaseScore();
        }
    }

    private getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    private getCurrentQuestionCorrectAnswer(): Answer {
        const currentQuestion = this.getCurrentQuestion();
        const correctAnswer = currentQuestion.answers.find(
            (answer) => answer.isCorrect,
        );
        if (!correctAnswer) {
            throw new Error('A question must have a correct answer.');
        }

        return correctAnswer;
    }

    private increaseScore(): void {
        this.score++;
    }
}
