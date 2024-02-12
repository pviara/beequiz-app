import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GivenAnswerState } from './quiz-step/model/given-answer-state';
import { NavigationService } from '../core/services/navigation.service';
import { Quiz } from '../core/model/quiz';
import { QuizService } from '../core/services/quiz-service';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnDestroy, OnInit {
    givenAnswerState: GivenAnswerState = {
        hasAnswerBeenGiven: false,
        hasAnswerBeenChecked: false,
    };

    quiz!: Quiz;

    private navigationService = inject(NavigationService);
    private quizService = inject(QuizService);
    private router = inject(Router);

    ngOnDestroy(): void {
        this.navigationService.deactivateQuizQuittingPrevention();
    }

    ngOnInit(): void {
        this.navigationService.activateQuizQuittingPrevention();

        this.quizService.generatedQuiz.subscribe({
            next: (quiz) => {
                if (quiz) {
                    this.quiz = quiz;
                }
            },
        });
    }

    exitQuiz(): void {
        this.quizService.killQuiz();
        this.router.navigate(['/home']);
    }

    hasQuizBeenLoaded(): boolean {
        return new Boolean(this.quiz).valueOf();
    }

    onConfirmedAnswer(answerId: string): void {
        this.markAnswerAsGiven(answerId);
        this.handleAnsweredQuestion(answerId);
    }

    onExistQuizRequested(): void {
        this.exitQuiz();
    }

    onNextStepRequested(): void {
        console.log('next step requested');

        if (this.quiz.hasQuizBeenCompleted()) {
            this.exitQuiz();
            return;
        }

        this.resetGivenAnswerState();
        this.quiz.goToNextQuestion();
    }

    private resetGivenAnswerState(): void {
        this.givenAnswerState = {
            givenAnswerId: undefined,
            hasAnswerBeenGiven: false,
            hasAnswerBeenChecked: false,
        };
    }

    private markAnswerAsGiven(answerId: string): void {
        this.givenAnswerState.hasAnswerBeenGiven = true;
        this.givenAnswerState.givenAnswerId = answerId;
    }

    private handleAnsweredQuestion(answerId: string): void {
        this.quizService
            .answerQuestion(answerId, this.quiz.getCurrentQuestionId())
            .pipe(delay(200))
            .subscribe(({ correctAnswerId, isCorrect }) => {
                this.markAnswerAsChecked();

                if (isCorrect) {
                    this.givenAnswerState.correctAnswerId = answerId;
                } else {
                    this.givenAnswerState.correctAnswerId = correctAnswerId;
                }

                this.quiz.handleScoreForAnswer(answerId, isCorrect);
            });
    }

    private markAnswerAsChecked(): void {
        this.givenAnswerState.hasAnswerBeenChecked = true;
    }
}
