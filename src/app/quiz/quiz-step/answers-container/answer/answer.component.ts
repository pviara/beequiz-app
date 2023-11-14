import { Answer } from '../../../../core/model/quiz';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {
    @Input()
    answer!: Answer;

    @Output()
    answerSelected = new EventEmitter<number>();

    @Input()
    isSelected!: boolean;

    selectAnswer(): void {
        this.answerSelected.emit(this.answer.id);
    }
}
