import { AuthService } from '../core/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { WelcomeService } from '../core/welcome.service';

export const welcomeGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const welcomeService = inject(WelcomeService);

    if (!authService.isAuthenticated()) {
        router.navigate(['/']);
        return of(false);
    }

    if (welcomeService.hasUserBeenWelcomed()) {
        router.navigate(['../home']);
    }

    return of(true);
};
