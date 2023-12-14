import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizParamsForm } from './model/quiz-params-form';
import { QuizParameters } from '../../core/model/quiz-parameters';
import { QuizParametersService } from '../../core/services/quiz-parameters.service';
import { QuizService } from '../../core/services/quiz-service';
import { QuizTheme } from '../../core/model/quiz-theme';
import { Router } from '@angular/router';

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
    errorMessage = '';

    quizParameters = new QuizParameters([], []);

    quizParamsForm!: FormGroup<QuizParamsForm>;

    private formBuilder = inject(FormBuilder);
    private quizParametersService = inject(QuizParametersService);
    private quizService = inject(QuizService);
    private router = inject(Router);

    async ngOnInit(): Promise<void> {
        this.quizParameters = await this.quizParametersService.getParameters();

        this.quizParamsForm = this.formBuilder.nonNullable.group({
            quizThemeId: this.formBuilder.nonNullable.control(
                this.quizParameters.themes[0].id,
                [Validators.min(0)],
            ),
            quizNumberOfQuestions: this.formBuilder.nonNullable.control(
                this.quizParameters.numberOfQuestions[0],
                [Validators.min(this.quizParameters.numberOfQuestions[0])],
            ),
        });
    }

    isNumberOfQuestionsSelected(numberOfQuestions: number): boolean {
        return (
            this.quizParamsForm.value.quizNumberOfQuestions ===
            numberOfQuestions
        );
    }

    isQuizBeingLoaded(): boolean {
        return this.quizService.hasQuizBeenRequested && !this.errorMessage;
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

        this.quizService
            .launchQuizGeneration(quizThemeId, quizNumberOfQuestions)
            .subscribe({
                next: (quiz) => {
                    if (quiz) {
                        this.router.navigate(['/play'], { replaceUrl: true });
                    }
                },
                error: () => {
                    this.errorMessage =
                        '😔 Une erreur est survenue, merci de réessayer.';
                },
            });
    }

    mustSpinnerBeDisplayed(): boolean {
        return this.haveAllDataNotBeenFetched() || this.isQuizBeingLoaded();
    }

    onNumberOfQuestionsSelect(numberOfQuestions: number): void {
        this.quizParamsForm
            .get('quizNumberOfQuestions')
            ?.setValue(numberOfQuestions);
    }

    onQuizThemeSelect(quizTheme: QuizTheme): void {
        this.quizParamsForm.get('quizThemeId')?.setValue(quizTheme.id);
    }

    private haveAllDataNotBeenFetched(): boolean {
        return (
            this.quizParameters.themes.length === 0 ||
            this.quizParameters.numberOfQuestions.length === 0
        );
    }

    private validateQuizParamsForm(): ValidatedQuizParamsFormValues {
        const { quizThemeId, quizNumberOfQuestions } =
            this.quizParamsForm.value;

        const isQuizThemeIdInvalid =
            quizThemeId === null || quizThemeId === undefined;

        const minimumNumberOfQuestions =
            this.quizParameters.numberOfQuestions[0];

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
}
