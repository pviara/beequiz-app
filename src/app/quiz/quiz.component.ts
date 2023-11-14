import { Component, OnDestroy, OnInit } from '@angular/core';
import { GivenAnswerState } from './quiz-step/model/given-answer-state';
import { NavigationService } from '../core/services/navigation.service';
import { Quiz } from '../core/model/quiz';
import { QuizService } from '../core/services/quiz-service';
import { Router } from '@angular/router';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnDestroy, OnInit {
    givenAnswerState: GivenAnswerState = {
        hasAnswerBeenGiven: false,
        wasGivenAnswerCorrect: false,
    };

    quiz!: Quiz;

    constructor(
        private navigationService: NavigationService,
        private quizService: QuizService,
        private router: Router,
    ) {}

    ngOnDestroy(): void {
        this.navigationService.deactivateQuizQuittingPrevention();
    }

    ngOnInit(): void {
        this.navigationService.activateQuizQuittingPrevention();

        this.quizService.generatedQuiz.subscribe((quiz) => {
            if (quiz) {
                this.quiz = quiz;
            }
        });
    }

    exitQuiz(): void {
        this.quizService.killQuiz();
        this.router.navigate(['/home']);
    }

    hasQuizBeenLoaded(): boolean {
        return new Boolean(this.quiz).valueOf();
    }

    onConfirmedAnswer(answerId: number): void {
        const wasGivenAnswerCorrect = this.quiz.handleScoreForAnswer(answerId);
        this.givenAnswerState = {
            givenAnswerId: answerId,
            hasAnswerBeenGiven: true,
            wasGivenAnswerCorrect,
        };
    }

    onNextStepRequested(): void {
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
            wasGivenAnswerCorrect: false,
        };
    }
}
