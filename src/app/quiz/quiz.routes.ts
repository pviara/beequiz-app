import { QuizComponent } from './quiz.component';
import { quizGuard } from './quiz.guard';
import { Routes } from '@angular/router';

export const quizRoutes: Routes = [
    {
        path: '',
        canActivate: [quizGuard],
        component: QuizComponent,
    },
];
