import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizParametricComponent } from './quiz-parametric.component';
import { QuizThemeComponent } from './quiz-theme/quiz-theme.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [QuizParametricComponent, QuizThemeComponent],
    imports: [CommonModule, SharedModule],
})
export class QuizParametricModule {}
