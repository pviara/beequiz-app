import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';
import { NgModule } from '@angular/core';
import { QuizModule } from './quiz/quiz.module';
import { QuizParametricModule } from './quiz-parametric/quiz-parametric.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        RouterModule.forChild(homeRoutes),
        QuizModule,
        QuizParametricModule,
        SharedModule,
    ],
})
export class HomeModule {}
