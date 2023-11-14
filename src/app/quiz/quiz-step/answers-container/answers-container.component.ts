import { Answer } from '../../../core/model/quiz';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GivenAnswerState } from '../model/given-answer-state';

@Component({
    selector: 'answers-container',
    templateUrl: './answers-container.component.html',
    styleUrls: ['./answers-container.component.scss'],
})
export class AnswersContainerComponent {
    @Input()
    answers!: Answer[];

    @Input()
    givenAnswerState!: GivenAnswerState;

    @Input()
    selectedAnswerId?: number;

    @Output()
    answerSelected = new EventEmitter<number>();

    mustBeSelected(answer: Answer): boolean {
        return (
            this.selectedAnswerId === answer.id &&
            !this.givenAnswerState.hasAnswerBeenGiven
        );
    }

    onAnswerSelected(answerId: number): void {
        if (this.givenAnswerState.hasAnswerBeenGiven) {
            return;
        }

        this.answerSelected.emit(answerId);
    }
}
