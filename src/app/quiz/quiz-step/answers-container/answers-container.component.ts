import { Answer } from '../../../core/model/quiz';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'answers-container',
    templateUrl: './answers-container.component.html',
    styleUrls: ['./answers-container.component.scss'],
})
export class AnswersContainerComponent {
    @Input()
    answers!: Answer[];

    @Output()
    answerSelected = new EventEmitter<number>();

    selectedAnswerId?: number;

    mustBeSelected(answer: Answer): boolean {
        return this.selectedAnswerId === answer.id;
    }

    onAnswerSelected(answerId: number): void {
        this.selectedAnswerId = this.getAnswer(answerId).id;
        this.answerSelected.emit(this.selectedAnswerId);
    }

    private getAnswer(answerId: number): Answer {
        const existingAnswer = this.answers.find(
            (answer) => answer.id === answerId,
        );
        if (!existingAnswer) {
            throw new Error(`Answer should exist with id ${answerId}.`);
        }

        return existingAnswer;
    }
}
