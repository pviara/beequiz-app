import { Answer } from '../../../../core/model/quiz';
import { Component, EventEmitter, Output, input } from '@angular/core';
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
    answerSelected = new EventEmitter<string>();

    getAnswerStyle(): string[] {
        const classes: string[] = [];
        const [disabled, selected, correct, incorrect] = [
            'disabled',
            'selected',
            'correct',
            'incorrect',
        ];

        if (this.hasAnswerBeenGiven()) {
            classes.push(disabled);
        }

        if (this.hasAnswerBeenChecked()) {
            if (this.isCurrentAnswerCorrect()) {
                classes.push(correct);
                this.removeFromClasses(classes, selected);
            } else if (this.isCurrentAnswerTheGivenOne()) {
                classes.push(incorrect);
                this.removeFromClasses(classes, selected);
            }
        } else if (this.isSelected()) {
            classes.push(selected);
        }

        return classes;
    }

    selectAnswer(): void {
        if (this.hasAnswerBeenGiven()) {
            return;
        }

        this.answerSelected.emit(this.answer().id);
    }

    wasThisAnswerCorrect(): boolean {
        return (
            this.givenAnswerState().hasAnswerBeenGiven &&
            this.givenAnswerState().correctAnswerId === this.answer().id
        );
    }

    wasThisGivenAnswerIncorrect(): boolean {
        return (
            this.givenAnswerState().hasAnswerBeenGiven &&
            this.givenAnswerState().givenAnswerId === this.answer().id &&
            this.givenAnswerState().correctAnswerId !== this.answer().id
        );
    }

    private hasAnswerBeenGiven(): boolean {
        return this.givenAnswerState().hasAnswerBeenGiven;
    }

    private hasAnswerBeenChecked(): boolean {
        return this.givenAnswerState().hasAnswerBeenChecked;
    }

    private isCurrentAnswerCorrect() {
        return this.givenAnswerState().correctAnswerId === this.answer().id;
    }

    private removeFromClasses(classes: string[], target: string) {
        const selectedClassIndex = classes.findIndex(
            (_class) => _class === target,
        );
        if (selectedClassIndex > -1) {
            classes.splice(selectedClassIndex, 1);
        }
    }

    private isCurrentAnswerTheGivenOne(): boolean {
        return this.givenAnswerState().givenAnswerId === this.answer().id;
    }
}
