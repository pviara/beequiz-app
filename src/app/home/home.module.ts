import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
