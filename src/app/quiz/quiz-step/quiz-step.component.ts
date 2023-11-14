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
    confirmedAnswer = new EventEmitter<number>();

    @Input()
    isGivenAnswerCorrect!: boolean;

    @Output()
    nextStepRequested = new EventEmitter<never>();

    @Input()
    questionLabel!: string;

    private selectedAnswer?: Answer;

    isSelected(id: number): boolean {
        return this.selectedAnswer?.id === id;
    }

    mustConfirmButtonBeDisabled(): boolean {
        return this.noAnswerSelected() || this.hasScoreBeenMade();
    }

    mustNextButtonBeDisabled(): boolean {
        return !this.hasScoreBeenMade();
    }

    onAnswerConfirmed(): void {
        this.confirmedAnswer.emit(this.selectedAnswer?.id);
    }

    onAnswerSelected(answerId: number): void {
        this.selectAnswer(answerId);
    }

    onNextStepRequested(): void {
        this.nextStepRequested.emit();
    }

    private hasScoreBeenMade(): boolean {
        return this.isGivenAnswerCorrect !== undefined;
    }

    private noAnswerSelected(): boolean {
        return !this.selectedAnswer;
    }

    private selectAnswer(id: number): void {
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
}
