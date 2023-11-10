import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routes';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [LandingComponent, SignInComponent, SignUpComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(landingRoutes),
        SharedModule,
    ],
    exports: [RouterModule],
})
export class LandingModule {}
