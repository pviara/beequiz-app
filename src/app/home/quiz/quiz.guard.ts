import { AuthService } from '../../core/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { QuizService } from '../../core/services/quiz-service';

export const quizGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const quizService = inject(QuizService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/']);
        return of(false);
    }

    if (!quizService.hasQuizBeenRequested) {
        router.navigate(['/home']);
        return of(false);
    }

    return of(true);
};
