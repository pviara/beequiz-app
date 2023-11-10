import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class WelcomeService {
    private welcomedUser?: User;

    constructor(private authService: AuthService) {}

    hasUserBeenWelcomed(): boolean {
        return new Boolean(this.welcomedUser).valueOf();
    }

    welcomeUser(): void {
        this.welcomedUser = this.authService.authenticatedUser;
    }
}
