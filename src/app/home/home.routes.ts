import { HomeComponent } from './home.component';
import { homeGuard } from './home.guard';
import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        canActivate: [homeGuard],
        component: HomeComponent,
    },
];
