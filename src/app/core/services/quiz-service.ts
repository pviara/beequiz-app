import { Answer, Question, Quiz } from '../model/quiz';
import {
    BehaviorSubject,
    Observable,
    of,
    switchMap,
    tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    hasQuizBeenRequested = false;

    generatedQuiz = new BehaviorSubject<Quiz | null>(null);

    private httpClient = inject(HttpClient);
    
    private apiEndpoint = `${environment.API_URL}/quiz`;

    killQuiz(): void {
        this.generatedQuiz.next(null);
        this.hasQuizBeenRequested = false;
    }

    launchQuizGeneration(
        quizThemeId: number,
        numberOfQuestions: number,
    ): Observable<null> {
        this.markQuizAsRequested();

        return this.httpClient
            .get<Record<string, any>[]>(
                `${this.apiEndpoint}/questions?amount=${numberOfQuestions}&themeId=${quizThemeId}`,
            )
            .pipe(
                tap((questions) => {
                    this.generatedQuiz.next(this.createQuizFrom(questions));
                }),
                switchMap((_) => of(null)),
            );

        //     // TODO | Don't forget to reset quiz request state to prevent the user to visit
        //     // TODO | quiz component page while no quiz generation has been requested.
        //     // TODO ---
        //     // TODO | But don't do it here at this line! Rather from the quiz component itself.
        //     // TODO | Otherwise user won't be able to access quiz component immediatly which
        //     // TODO | makes no sense.
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
