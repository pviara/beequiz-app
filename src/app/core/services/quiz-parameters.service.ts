import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { QuizTheme } from '../model/quiz-theme';
import { QuizParameters } from '../model/quiz-parameters';

@Injectable({
    providedIn: 'root',
})
export class QuizParametersService {
    async getParameters(): Promise<QuizParameters> {
        const result = await fetch(`${environment.API_URL}/quiz/parameters`);

        const data = await result.json();

        return new QuizParameters(
            data['themes'].map(
                (theme: any) =>
                    new QuizTheme(theme.id, theme.code, theme.label),
            ),
            data['numberOfQuestions'],
        );
    }
}
