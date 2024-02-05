import { Answer } from '../../../../core/model/quiz';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { GivenAnswerState } from '../../model/given-answer-state';

@Component({
    selector: 'answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {
    answer = input.required<Answer>();

    givenAnswerState = input.required<GivenAnswerState>();

    isSelected = input.required<boolean>();

    @Output()
    answerSelected = new EventEmitter<number>();

    selectAnswer(): void {
        this.answerSelected.emit(this.answer().id);
    }

    wasAnswerGiven(): boolean {
        return new Boolean(this.givenAnswerState().givenAnswerId).valueOf();
    }

    wasThisGivenAnswerCorrect(): boolean {
        return (
            this.givenAnswerState().givenAnswerId === this.answer().id &&
            this.givenAnswerState().hasAnswerBeenGiven &&
            this.givenAnswerState().wasGivenAnswerCorrect
        );
    }

    wasThisGivenAnswerIncorrect(): boolean {
        return (
            this.givenAnswerState().givenAnswerId === this.answer().id &&
            this.givenAnswerState().hasAnswerBeenGiven &&
            !this.givenAnswerState().wasGivenAnswerCorrect
        );
    }
}
