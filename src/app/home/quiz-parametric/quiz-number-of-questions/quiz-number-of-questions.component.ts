import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'quiz-number-of-questions',
    templateUrl: './quiz-number-of-questions.component.html',
    styleUrls: [
        './quiz-number-of-questions.component.scss',
        '../quiz-parameters.styles.scss',
    ],
})
export class QuizNumberOfQuestionsComponent {
    @Input()
    data!: number;

    @Input()
    isSelected!: boolean;

    @Output()
    selectedNumberOfQuestions = new EventEmitter<number>();

    onContainerClick(): void {
        this.selectedNumberOfQuestions.emit(this.data);
    }
}
