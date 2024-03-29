import { landingGuard } from './landing/landing.guard';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { welcomeGuard } from './welcome/welcome.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [landingGuard],
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
        loadChildren: () =>
            import('./quiz/quiz.module').then((m) => m.QuizModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
