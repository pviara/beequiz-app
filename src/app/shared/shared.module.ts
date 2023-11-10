import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FooterComponent, HeaderComponent],
    exports: [FooterComponent, HeaderComponent],
})
export class SharedModule {}
