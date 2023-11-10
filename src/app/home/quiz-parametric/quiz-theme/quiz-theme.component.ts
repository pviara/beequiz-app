import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Input()
    data!: QuizTheme;

    @Input()
    isSelected!: boolean;

    @Output()
    selectedQuizTheme = new EventEmitter<QuizTheme>();

    computeImagePath(): string {
        return `../../../../assets/images/${this.data.name}.png`;
    }

    onContainerClick(): void {
        this.selectedQuizTheme.emit(this.data);
    }
}
