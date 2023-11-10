import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeService } from '../core/welcome.service';

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    standalone: true,
})
export class WelcomeComponent {
    constructor(
        private router: Router,
        private welcomeService: WelcomeService,
    ) {}

    onNext(): void {
        this.welcomeService.welcomeUser();
        this.router.navigate(['../home']);
    }
}
