export class Question {
    constructor(
        readonly id: number,
        readonly label: string,
        readonly answers: Answer[],
    ) {}
}

export class Answer {
    constructor(
        readonly id: number,
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

    private score = 0;

    constructor(
        readonly questions: Question[],
        readonly givenAnswers: number[],
    ) {}

    formatCurrentStepPaginator(): string {
        return `${this.currentQuestionIndex + 1}/${this.questions.length}`;
    }

    formatScoreMessage(): string {
        return `${this.score}/${this.questions.length}`;
    }

    getCurrentQuestionAnswers(): Answer[] {
        return this.getCurrentQuestion().answers;
    }

    getCurrentQuestionLabel(): string {
        return this.getCurrentQuestion().label;
    }

    getScoreEvaluation(): QuizScoreEvaluation {
        return new QuizScoreEvaluation(this.score, this.questions.length);
    }

    goToNextQuestion(): void {
        if (this.isCurrentQuestionTheLastOne()) {
            return;
        }

        this.currentQuestionIndex++;
    }

    hasQuizBeenCompleted(): boolean {
        return this.givenAnswers.length === this.questions.length;
    }

    isGivenAnswerCorrect(answerId: number): boolean {
        const correctAnswer = this.getCurrentQuestionCorrectAnswer();
        return correctAnswer.id === answerId;
    }

    isInProgress(): boolean {
        return this.givenAnswers.length < this.questions.length;
    }

    handleScoreForAnswer(answerId: number): boolean {
        this.givenAnswers.push(answerId);

        if (this.isGivenAnswerCorrect(answerId)) {
            this.increaseScore();
            return true;
        }
        return false;
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

    private isCurrentQuestionTheLastOne(): boolean {
        return !this.questions[this.currentQuestionIndex + 1];
    }
}
