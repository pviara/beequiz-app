import { ActivationStart, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { QuizService } from './quiz-service';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private quizService = inject(QuizService);
    private router = inject(Router);
    
    private subscribedEvents!: Subscription;

    activateQuizQuittingPrevention(): void {
        this.subscribedEvents = this.router.events.subscribe((event) => {
            if (event instanceof ActivationStart) {
                const activatedPath = event.snapshot.url[0]?.path;
                const userWantsToEscapeQuiz = !activatedPath?.includes('play');
                const { hasQuizBeenRequested } = this.quizService;

                if (hasQuizBeenRequested && userWantsToEscapeQuiz) {
                    const quizRoutePath = '/play';
                    this.router.navigate([quizRoutePath]);
                }
            }
        });
    }

    deactivateQuizQuittingPrevention(): void {
        this.subscribedEvents.unsubscribe();
    }
}
