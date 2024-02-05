import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { QuizScoreEvaluation } from '../../core/model/quiz';

@Component({
    selector: 'quiz-results',
    templateUrl: './quiz-results.component.html',
    styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
    scoreMessage = input.required<string>();

    scoreEvaluation = input.required<QuizScoreEvaluation>();

    @Output()
    exitQuizRequested = new EventEmitter<never>();

    exitQuiz(): void {
        this.exitQuizRequested.emit();
    }
}
