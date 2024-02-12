import { Answer } from '../../../core/model/quiz';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { GivenAnswerState } from '../model/given-answer-state';

@Component({
    selector: 'answers-container',
    templateUrl: './answers-container.component.html',
    styleUrls: ['./answers-container.component.scss'],
})
export class AnswersContainerComponent {
    answers = input.required<Answer[]>();

    givenAnswerState = input.required<GivenAnswerState>();

    selectedAnswerId = input<string>();

    @Output()
    answerSelected = new EventEmitter<string>();

    mustBeSelected(answer: Answer): boolean {
        return this.selectedAnswerId() === answer.id;
    }

    onAnswerSelected(answerId: string): void {
        if (this.givenAnswerState().hasAnswerBeenGiven) {
            return;
        }

        this.answerSelected.emit(answerId);
    }
}
