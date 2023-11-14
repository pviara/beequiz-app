import { ActionsContainerComponent } from './quiz-step/actions-container/actions-container.component';
import { AnswerComponent } from './quiz-step/answers-container/answer/answer.component';
import { AnswersContainerComponent } from './quiz-step/answers-container/answers-container.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { quizRoutes } from './quiz.routes';
import { QuizStepComponent } from './quiz-step/quiz-step.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ActionsContainerComponent,
        AnswerComponent,
        AnswersContainerComponent,
        QuizComponent,
        QuizStepComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(quizRoutes), SharedModule],
})
export class QuizModule {}
