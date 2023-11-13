import { ActivationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { QuizService } from './quiz-service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(
        private quizService: QuizService,
        private router: Router,
    ) {}

    activateQuizQuitPrevention(): void {
        this.router.events.subscribe((event) => {
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
}
