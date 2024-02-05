import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { GivenAnswerState } from '../model/given-answer-state';

@Component({
    selector: 'actions-container',
    templateUrl: './actions-container.component.html',
    styleUrls: ['./actions-container.component.scss'],
})
export class ActionsContainerComponent {
    givenAnswerState = input.required<GivenAnswerState>();

    isConfirmButtonDisabled = input.required<boolean>();

    isNextButtonDisabled = input.required<boolean>();

    @Output()
    answerConfirmed = new EventEmitter<never>();

    @Output()
    nextStepRequested = new EventEmitter<never>();

    confirmAnswer(): void {
        this.answerConfirmed.emit();
    }

    goToNextStep(): void {
        this.nextStepRequested.emit();
    }
}
