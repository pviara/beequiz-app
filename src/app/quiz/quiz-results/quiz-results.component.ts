import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizScoreEvaluation } from '../../core/model/quiz';

@Component({
    selector: 'quiz-results',
    templateUrl: './quiz-results.component.html',
    styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
    @Input()
    scoreMessage!: string;

    @Input()
    scoreEvaluation!: QuizScoreEvaluation;

    @Output()
    exitQuizRequested = new EventEmitter<never>();

    exitQuiz(): void {
        this.exitQuizRequested.emit();
    }
}
