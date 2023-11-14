import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../core/services/navigation.service';
import { Quiz } from '../core/model/quiz';
import { QuizService } from '../core/services/quiz-service';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnDestroy, OnInit {
    isGivenAnswerCorrect!: boolean;

    quiz!: Quiz;

    constructor(
        private navigationService: NavigationService,
        private quizService: QuizService,
    ) {}

    ngOnDestroy(): void {
        this.navigationService.deactivateQuizQuitPrevention();
    }

    ngOnInit(): void {
        this.navigationService.activateQuizQuitPrevention();

        this.quizService.generatedQuiz.subscribe((quiz) => {
            if (quiz) {
                this.quiz = quiz;
            }
        });
    }

    hasQuizBeenLoaded(): boolean {
        return new Boolean(this.quiz).valueOf();
    }

    onConfirmedAnswer(answerId: number): void {
        this.isGivenAnswerCorrect = this.quiz.handleScoreForAnswer(answerId);
    }

    onNextStepRequested(): void {
        this.quiz.goToNextQuestion();
    }
}
