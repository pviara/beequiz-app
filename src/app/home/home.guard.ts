import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivateFn,
    Navigation,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { QuizService } from '../core/services/quiz-service';

export const homeGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const quizService = inject(QuizService);
    const router = inject(Router);
    const currentNavigation = router.getCurrentNavigation();

    if (mustHomeGuardBeBypassed(currentNavigation)) {
        return of(true);
    }

    if (!authService.isAuthenticated()) {
        router.navigate(['/']);
        return of(false);
    }

    if (quizService.hasQuizBeenRequested) {
        router.navigate(['/home/play'], { state: { bypassHomeGuard: true } });
        return of(true);
    }

    return of(true);
};

function mustHomeGuardBeBypassed(
    currentNavigation: Navigation | null,
): boolean {
    return currentNavigation?.extras.state?.['bypassHomeGuard'];
}
