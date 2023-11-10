import { Routes } from '@angular/router';

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
];
