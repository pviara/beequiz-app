import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [QuizComponent],
    imports: [CommonModule, SharedModule],
})
export class QuizModule {}
