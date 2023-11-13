import { HomeComponent } from './home.component';
import { homeGuard } from './home.guard';
import { QuizComponent } from './quiz/quiz.component';
import { quizGuard } from './quiz/quiz.guard';
import { QuizParametricComponent } from './quiz-parametric/quiz-parametric.component';
import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        canActivate: [homeGuard],
        component: HomeComponent,
        children: [
            {
                path: '',
                component: QuizParametricComponent,
            },
        ],
    },
];
