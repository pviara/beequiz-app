import { Injectable } from '@angular/core';
import { QuizTheme } from '../model/quiz-theme';

@Injectable({
    providedIn: 'root',
})
export class QuizThemeService {
    private quizThemes: QuizTheme[] = [
        new QuizTheme(0, 'sport'),
        new QuizTheme(1, 'music'),
        new QuizTheme(2, 'cinema'),
        new QuizTheme(3, 'geography'),
    ];

    getAllQuizThemes(): QuizTheme[] {
        return this.quizThemes;
    }
}
