import { Injectable, inject } from '@angular/core';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class WelcomeService {
    private welcomedUser?: User;

    hasUserBeenWelcomed(): boolean {
        return new Boolean(this.welcomedUser).valueOf();
    }

    // markUserAsWelcomed(): void {
    //     this.welcomedUser = this.authService.authenticatedUser;
    // }
}
