import { Answer, Question, Quiz } from '../model/quiz';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    hasQuizBeenRequested = false;

    generatedQuiz = new BehaviorSubject<Quiz | null>(null);

    private authService = inject(AuthService);
    private httpClient = inject(HttpClient);

    private apiEndpoint = `${environment.API_URL}/quiz`;

    answerQuestion(answerId: string, questionId: string): Observable<any> {
        return this.httpClient.post(
            `${this.apiEndpoint}/answer`,
            {
                answerId,
                questionId,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.authService.signedInUser?.token}`,
                },
            },
        );
    }

    killQuiz(): void {
        this.generatedQuiz.next(null);
        this.hasQuizBeenRequested = false;
    }

    launchQuizGeneration(
        quizThemeId: number,
        numberOfQuestions: number,
    ): Observable<Quiz | null> {
        this.markQuizAsRequested();

        return this.httpClient
            .get<Question[]>(
                `${this.apiEndpoint}/questions?amount=${numberOfQuestions}&themeId=${quizThemeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authService.signedInUser?.token}`,
                    },
                },
            )
            .pipe(
                tap((questions) => {
                    const quiz = this.createQuizFrom(questions);
                    this.generatedQuiz.next(quiz);
                }),
                switchMap((_) => of(this.generatedQuiz.value)),
            );
    }

    private createQuizFrom(questions: Record<string, any>[]): Quiz {
        return new Quiz(this.mapToQuestions(questions));
    }

    private mapToQuestions(questions: Record<string, any>[]): Question[] {
        return questions.map((question) => this.mapToQuestion(question));
    }

    private mapToQuestion(question: Record<string, any>): Question {
        return new Question(
            question['id'],
            question['label'],
            this.mapToAnswers(question['answers']),
        );
    }

    private mapToAnswers(answers: Record<string, any>[]): Answer[] {
        return answers.map(
            (answer) =>
                new Answer(answer['id'], answer['label'], answer['isCorrect']),
        );
    }

    private markQuizAsRequested(): void {
        this.hasQuizBeenRequested = true;
    }
}
