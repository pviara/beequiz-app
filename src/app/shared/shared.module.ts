import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SnackbarComponent,
        SpinnerComponent,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SnackbarComponent,
        SpinnerComponent,
    ],
    imports: [CommonModule],
})
export class SharedModule {}
