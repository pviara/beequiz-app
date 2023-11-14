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

export class Quiz {
    private currentQuestionIndex = 0;

    private score = 0;

    constructor(
        readonly questions: Question[],
        readonly givenAnswers: Answer[],
    ) {}

    getCurrentQuestionAnswers(): Answer[] {
        return this.getCurrentQuestion().answers;
    }

    getCurrentQuestionLabel(): string {
        return this.getCurrentQuestion().label;
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

    handleScoreForAnswer(answerId: number): boolean {
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
