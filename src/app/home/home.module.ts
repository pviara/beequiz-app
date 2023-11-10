import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';
import { NgModule } from '@angular/core';
import { QuizParametricComponent } from './quiz-parametric/quiz-parametric.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent, QuizParametricComponent],
    imports: [CommonModule, RouterModule.forChild(homeRoutes), SharedModule],
})
export class HomeModule {}
