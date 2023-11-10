import { AuthService } from '../core/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const homeGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/']);
        return of(false);
    }

    return of(true);
};
