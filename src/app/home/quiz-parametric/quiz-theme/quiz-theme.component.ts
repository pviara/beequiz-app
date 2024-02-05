import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { QuizTheme } from '../../../core/model/quiz-theme';

@Component({
    selector: 'quiz-theme',
    templateUrl: './quiz-theme.component.html',
    styleUrls: [
        './quiz-theme.component.scss',
        '../quiz-parameters.styles.scss',
    ],
})
export class QuizThemeComponent {
    data = input.required<QuizTheme>();

    isSelected = input.required<boolean>();

    @Output()
    selectedQuizTheme = new EventEmitter<QuizTheme>();

    computeImagePath(): string {
        return `../../../../assets/images/${this.data().code}.svg`;
    }

    onContainerClick(): void {
        this.selectedQuizTheme.emit(this.data());
    }
}
