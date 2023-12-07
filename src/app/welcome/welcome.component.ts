import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WelcomeService } from '../core/services/welcome.service';

@Component({
    selector: 'welcome',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
    constructor(private router: Router) {}

    onNext(): void {
        // todo mark user as welcomed : this.welcomeService.markUserAsWelcomed();
        this.router.navigate(['../home']);
    }
}
