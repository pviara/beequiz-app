import { AuthService } from '../core/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const welcomeGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/']);
        return of(false);
    }

    if (authService.signedInUser?.user.hasBeenWelcomed) {
        router.navigate(['../home']);
    }

    return of(true);
};
