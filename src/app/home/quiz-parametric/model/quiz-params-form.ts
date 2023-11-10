import { FormControl } from '@angular/forms';

export type QuizParamsForm = {
    quizThemeId: FormControl<number>;
    quizNumberOfQuestions: FormControl<number>;
};
