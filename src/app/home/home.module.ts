import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(homeRoutes), SharedModule],
})
export class HomeModule {}
