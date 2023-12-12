import { AuthService } from '../core/services/auth.service';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    private authService = inject(AuthService);

    launchLogout(): void {
        this.authService.logout();
    }
}
