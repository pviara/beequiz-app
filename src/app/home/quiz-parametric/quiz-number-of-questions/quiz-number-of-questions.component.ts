import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
    selector: 'quiz-number-of-questions',
    templateUrl: './quiz-number-of-questions.component.html',
    styleUrls: [
        './quiz-number-of-questions.component.scss',
        '../quiz-parameters.styles.scss',
    ],
})
export class QuizNumberOfQuestionsComponent {
    data = input.required<number>();

    isSelected = input.required<boolean>();

    @Output()
    selectedNumberOfQuestions = new EventEmitter<number>();

    onContainerClick(): void {
        this.selectedNumberOfQuestions.emit(this.data());
    }
}
