import { Injectable } from '@angular/core';
import { Answer, Question, Quiz } from '../model/quiz';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    getQuizFrom(quizThemeId: number, numberOfQuestions: number): Quiz {
        return new Quiz(
            [
                new Question(0, 'Qui a remporté le Super Bowl LIV en 2020 ?', [
                    new Answer(0, 0, 'Les Kansas City Chiefs'),
                    new Answer(1, 0, 'Les San Francisco 49ers'),
                    new Answer(2, 0, 'Les New England Patriots'),
                    new Answer(3, 0, 'Les Green Bay Packers'),
                ]),
            ],
            [],
        );
    }
}
