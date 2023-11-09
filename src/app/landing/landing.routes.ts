import { LandingComponent } from './landing.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const landingRoutes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: '',
                component: SignInComponent,
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
            },
        ],
    },
];
