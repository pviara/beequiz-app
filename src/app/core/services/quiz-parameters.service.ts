import { Injectable } from '@angular/core';
import { QuizTheme } from '../model/quiz-theme';

@Injectable({
    providedIn: 'root',
})
export class QuizParametersService {
    private quizThemes: QuizTheme[] = [
        new QuizTheme(0, 'sport'),
        new QuizTheme(1, 'music'),
        new QuizTheme(2, 'cinema'),
        new QuizTheme(3, 'geography'),
    ];

    getAllQuizThemes(): Promise<QuizTheme[]> {
        return new Promise<QuizTheme[]>((resolve) => {
            setTimeout(() => {
                resolve(this.quizThemes);
            }, 0);
        });
    }

    getAllQuizNumberOfQuestions(): number[] {
        return [5, 10, 15, 20];
    }
}
