import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GivenAnswerState } from '../model/given-answer-state';

@Component({
    selector: 'actions-container',
    templateUrl: './actions-container.component.html',
    styleUrls: ['./actions-container.component.scss'],
})
export class ActionsContainerComponent {
    @Input()
    givenAnswerState!: GivenAnswerState;

    @Input()
    isConfirmButtonDisabled!: boolean;

    @Input()
    isNextButtonDisabled!: boolean;

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