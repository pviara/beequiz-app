import { Component, Input } from '@angular/core';
import { QuizTheme } from '../../../core/model/quiz-theme';

@Component({
    selector: 'quiz-theme',
    templateUrl: './quiz-theme.component.html',
    styleUrls: ['./quiz-theme.component.scss'],
})
export class QuizThemeComponent {
    @Input()
    data!: QuizTheme;

    computeImagePath(): string {
        return `../../../../assets/images/${this.data.name}.png`;
    }
}
