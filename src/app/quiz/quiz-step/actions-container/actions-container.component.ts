import { Component, EventEmitter, Output, input } from '@angular/core';
import { GivenAnswerState } from '../model/given-answer-state';

@Component({
    selector: 'actions-container',
    templateUrl: './actions-container.component.html',
    styleUrls: ['./actions-container.component.scss'],
})
export class ActionsContainerComponent {
    givenAnswerState = input.required<GivenAnswerState>();

    noAnswerSelected = input.required<boolean>();

    private confirmButtonClicked = false;

    @Output()
    answerConfirmed = new EventEmitter<never>();

    @Output()
    nextStepRequested = new EventEmitter<never>();

    confirmAnswer(): void {
        this.toggleConfirmButtonClicked();
        this.answerConfirmed.emit();
    }

    goToNextStep(): void {
        this.toggleConfirmButtonClicked();
        this.nextStepRequested.emit();
    }

    mustConfirmButtonBeDisabled(): boolean {
        return this.noAnswerSelected() || this.confirmButtonClicked;
    }

    mustNextButtonBeDisabled(): boolean {
        return !this.givenAnswerState().hasAnswerBeenChecked;
    }

    private toggleConfirmButtonClicked() {
        this.confirmButtonClicked = !this.confirmButtonClicked;
    }
}
