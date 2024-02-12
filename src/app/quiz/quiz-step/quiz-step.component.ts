import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Answer } from '../../core/model/quiz';
import { GivenAnswerState } from './model/given-answer-state';

@Component({
    selector: 'quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
})
export class QuizStepComponent {
    answers = input.required<Answer[]>();

    givenAnswerState = input.required<GivenAnswerState>();

    questionLabel = input.required<string>();

    @Output()
    confirmedAnswer = new EventEmitter<number>();

    @Output()
    nextStepRequested = new EventEmitter<never>();

    selectedAnswerId?: number;

    mustConfirmButtonBeDisabled(): boolean {
        return (
            this.noAnswerSelected() ||
            this.givenAnswerState().hasAnswerBeenGiven
        );
    }

    mustNextButtonBeDisabled(): boolean {
        return !this.givenAnswerState().hasAnswerBeenGiven;
    }

    noAnswerSelected(): boolean {
        return this.selectedAnswerId === undefined;
    }

    onAnswerConfirmed(): void {
        this.confirmedAnswer.emit(this.selectedAnswerId);
    }

    onAnswerSelected(answerId: number): void {
        if (this.givenAnswerState().hasAnswerBeenGiven) {
            return;
        }

        this.selectedAnswerId = answerId;
    }

    onNextStepRequested(): void {
        this.resetSelectedAnswer();
        this.nextStepRequested.emit();
    }

    private resetSelectedAnswer(): void {
        this.selectedAnswerId = undefined;
    }
}
