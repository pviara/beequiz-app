import { Answer, Quiz } from '../core/model/quiz';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../core/services/navigation.service';
import { QuizService } from '../core/services/quiz-service';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    immediateScore?: 0 | 1;

    quiz!: Quiz;

    constructor(
        private navigationService: NavigationService,
        private quizService: QuizService,
    ) {}

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

    onConfirmedAnswer(answer: Answer): void {
        this.immediateScore = this.quiz.scoreAnswer(answer);
    }

    onGoToNextQuestion(): void {
        this.quiz.goToNextQuestion();
    }
}
