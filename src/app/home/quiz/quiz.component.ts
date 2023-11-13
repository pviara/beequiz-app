import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../core/model/quiz';
import { QuizService } from '../../core/services/quiz-service';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    quiz!: Quiz;

    constructor(private quizService: QuizService) {}

    ngOnInit(): void {
        this.quizService.generatedQuiz.subscribe((quiz) => {
            if (quiz) {
                this.quiz = quiz;
            }
        });
    }

    hasQuizBeenLoaded(): boolean {
        return new Boolean(this.quiz).valueOf();
    }
}
