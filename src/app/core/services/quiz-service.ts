import { Answer, Question, Quiz } from '../model/quiz';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    getQuizFrom(quizThemeId: number, numberOfQuestions: number): Quiz {
        return new Quiz(
            [
                new Question(
                    0,
                    'Quel joueur de tennis a remporté le plus grand nombre de titres en Grand Chelem ?',
                    [
                        new Answer(0, 'Rafael Nadal'),
                        new Answer(1, 'Novak Djokovic'),
                        new Answer(2, 'Roger Federer'),
                        new Answer(3, 'Pete Sampras', true),
                    ],
                ),
                new Question(
                    1,
                    'Quelle équipe a remporté le Super Bowl en 2021 ?',
                    [
                        new Answer(0, 'Kansas City Chiefs'),
                        new Answer(1, 'San Francisco 49ers'),
                        new Answer(2, 'New England Patriots'),
                        new Answer(3, 'Tampa Bay Buccaneers', true),
                    ],
                ),
                new Question(
                    2,
                    "Quel pays a remporté le plus grand nombre de médailles d'or aux Jeux Olympiques d'été de 2020 (reportés en 2021) ?",
                    [
                        new Answer(0, 'États-Unis'),
                        new Answer(1, 'Chine', true),
                        new Answer(2, 'Russie'),
                        new Answer(3, 'Japon'),
                    ],
                ),
                new Question(
                    3,
                    'Qui détient le record du monde du saut en hauteur masculin ?',
                    [
                        new Answer(0, 'Usain Bolt'),
                        new Answer(1, 'Sergey Bubka'),
                        new Answer(2, 'Javier Sotomayor', true),
                        new Answer(3, 'Renaud Lavillenie'),
                    ],
                ),
                new Question(
                    4,
                    "Quelle est la distance officielle d'un marathon ?",
                    [
                        new Answer(0, '42,195 km', true),
                        new Answer(1, '21,0975 km'),
                        new Answer(2, '10 kilomètres'),
                        new Answer(3, '50 kilomètres'),
                    ],
                ),
            ],
            [],
        );
    }
}
