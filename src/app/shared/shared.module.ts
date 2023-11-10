import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [FooterComponent, HeaderComponent, SpinnerComponent],
    exports: [FooterComponent, HeaderComponent, SpinnerComponent],
})
export class SharedModule {}
