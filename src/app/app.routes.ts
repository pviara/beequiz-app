import { QuizComponent } from './home/quiz/quiz.component';
import { quizGuard } from './home/quiz/quiz.guard';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { welcomeGuard } from './welcome/welcome.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./landing/landing.module').then((m) => m.LandingModule),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'welcome',
        canActivate: [welcomeGuard],
        component: WelcomeComponent,
    },
    {
        path: 'play',
        canActivate: [quizGuard],
        component: QuizComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
