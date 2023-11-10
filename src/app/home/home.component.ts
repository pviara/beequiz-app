import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private authService: AuthService) {}

    launchLogout(): void {
        this.authService.logout();
    }
}
