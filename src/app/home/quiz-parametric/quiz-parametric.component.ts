import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizParamsForm } from './model/quiz-params-form';
import { QuizTheme } from '../../core/model/quiz-theme';
import { QuizParametersService } from '../../core/services/quiz-parameters.service';
import { QuizService } from '../../core/services/quiz-service';

type ValidatedQuizParamsFormValues = {
    quizThemeId: number;
    quizNumberOfQuestions: number;
};

@Component({
    selector: 'quiz-parametric',
    templateUrl: './quiz-parametric.component.html',
    styleUrls: ['./quiz-parametric.component.scss'],
})
export class QuizParametricComponent implements OnInit {
    quizParamsForm!: FormGroup<QuizParamsForm>;

    quizNumberOfQuestions!: number[];
    quizThemes!: QuizTheme[];

    constructor(
        private formBuilder: FormBuilder,
        private quizParametersService: QuizParametersService,
        private quizService: QuizService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.quizNumberOfQuestions =
            this.quizParametersService.getAllQuizNumberOfQuestions();
        this.quizThemes = await this.quizParametersService.getAllQuizThemes();

        this.quizParamsForm = this.formBuilder.nonNullable.group({
            quizThemeId: this.formBuilder.nonNullable.control(
                this.quizThemes[0].id,
                [Validators.min(0)],
            ),
            quizNumberOfQuestions: this.formBuilder.nonNullable.control(
                this.quizNumberOfQuestions[0],
                [Validators.min(this.quizNumberOfQuestions[0])],
            ),
        });
    }

    haveAllDataBeenFetched(): boolean {
        return (
            new Boolean(this.quizThemes).valueOf() &&
            new Boolean(this.quizNumberOfQuestions).valueOf()
        );
    }

    isNumberOfQuestionsSelected(numberOfQuestions: number): boolean {
        return (
            this.quizParamsForm.value.quizNumberOfQuestions ===
            numberOfQuestions
        );
    }

    isQuizThemeSelected({ id }: QuizTheme): boolean {
        return this.quizParamsForm.value.quizThemeId === id;
    }

    launchQuiz(): void {
        if (this.quizParamsForm.invalid) {
            return;
        }

        const { quizThemeId, quizNumberOfQuestions } =
            this.validateQuizParamsForm();

        const createdQuiz = this.quizService.generateQuiz(
            quizThemeId,
            quizNumberOfQuestions,
        );
    }

    private validateQuizParamsForm(): ValidatedQuizParamsFormValues {
        const { quizThemeId, quizNumberOfQuestions } =
            this.quizParamsForm.value;

        const isQuizThemeIdInvalid =
            quizThemeId === null || quizThemeId === undefined;

        const minimumNumberOfQuestions = this.quizNumberOfQuestions[0];

        const areQuizNbrQuestionsInvalid =
            !quizNumberOfQuestions ||
            quizNumberOfQuestions < minimumNumberOfQuestions;

        if (isQuizThemeIdInvalid || areQuizNbrQuestionsInvalid) {
            throw new Error("QuizParamsForm couldn't be validated properly.");
        }

        return {
            quizThemeId,
            quizNumberOfQuestions,
        };
    }

    onNumberOfQuestionsSelect(numberOfQuestions: number): void {
        this.quizParamsForm
            .get('quizNumberOfQuestions')
            ?.setValue(numberOfQuestions);
    }

    onQuizThemeSelect(quizTheme: QuizTheme): void {
        this.quizParamsForm.get('quizThemeId')?.setValue(quizTheme.id);
    }
}
