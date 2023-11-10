import { Component, OnInit } from '@angular/core';
import { QuizTheme } from '../../core/model/quiz-theme';
import { QuizThemeService } from '../../core/services/quiz-theme.service';

@Component({
    selector: 'quiz-parametric',
    templateUrl: './quiz-parametric.component.html',
    styleUrls: ['./quiz-parametric.component.scss'],
})
export class QuizParametricComponent implements OnInit {
    quizThemes!: QuizTheme[];

    constructor(private quizThemeService: QuizThemeService) {}

    ngOnInit(): void {
        this.quizThemes = this.quizThemeService.getAllQuizThemes();
    }

    haveQuizThemesBeenFetched(): boolean {
        return new Boolean(this.quizThemes).valueOf();
    }
}
