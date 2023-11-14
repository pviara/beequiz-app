import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'actions-container',
    templateUrl: './actions-container.component.html',
    styleUrls: ['./actions-container.component.scss'],
})
export class ActionsContainerComponent {
    @Output()
    answerConfirmed = new EventEmitter<never>();

    @Input()
    isConfirmButtonDisabled!: boolean;

    @Input()
    isNextButtonDisabled!: boolean;

    @Output()
    nextStepRequested = new EventEmitter<never>();

    confirmAnswer(): void {
        this.answerConfirmed.emit();
    }

    goToNextQuestion(): void {
        this.nextStepRequested.emit();
    }
}
