import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from '../../core/model/quiz';

@Component({
    selector: 'quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
})
export class QuizStepComponent {
    @Input()
    answers!: Answer[];

    @Output()
    confirmedAnswer = new EventEmitter<Answer>();

    @Input()
    immediateScore?: 0 | 1;

    @Output()
    nextQuestionAsked = new EventEmitter<never>();

    @Input()
    questionLabel!: string;

    private selectedAnswer?: Answer;

    confirmAnswer(): void {
        if (!this.selectedAnswer) {
            return;
        }

        this.confirmedAnswer.emit(this.selectedAnswer);
    }

    goToNextQuestion(): void {
        this.selectedAnswer = undefined;
        this.immediateScore = undefined;
        this.nextQuestionAsked.emit();
    }

    hasScoreBeenMade(): boolean {
        return this.immediateScore !== undefined;
    }

    isBadScore(): boolean {
        return this.immediateScore === 0;
    }

    isPositiveScore(): boolean {
        return this.immediateScore === 1;
    }

    isSelected(id: number): boolean {
        return this.selectedAnswer?.id === id;
    }

    mustConfirmButtonBeDisabled(): boolean {
        return this.noAnswerSelected() || this.hasScoreBeenMade();
    }

    selectAnswer(id: number): void {
        if (this.hasScoreBeenMade()) {
            return;
        }

        const existingAnswer = this.answers.find((answer) => answer.id === id);
        if (!existingAnswer) {
            throw new Error(
                'Given answer does not exist in the list, which is not normal.',
            );
        }

        this.selectedAnswer = existingAnswer;
    }

    private noAnswerSelected(): boolean {
        return !this.selectedAnswer;
    }
}
