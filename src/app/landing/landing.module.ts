import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [LandingComponent, SignInComponent, SignUpComponent],
    imports: [RouterModule.forChild(landingRoutes)],
    exports: [RouterModule],
})
export class LandingModule {}
