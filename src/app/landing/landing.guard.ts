import { AuthService } from '../core/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const landingGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        router.navigate(['/home']);
        return of(false);
    }

    return of(true);
};
