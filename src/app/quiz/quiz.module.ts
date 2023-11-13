import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { quizRoutes } from './quiz.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [QuizComponent],
    imports: [CommonModule, RouterModule.forChild(quizRoutes), SharedModule],
})
export class QuizModule {}
