import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authenticatedUser?: User;

    constructor(
        private router: Router,
        private userService: UserService,
    ) {}

    authenticate(username: string, password: string): void {
        const errorMessage = 'Mauvais identifiant et/ou mot de passe.';

        const existingUser = this.userService.findByUsername(username);
        if (!existingUser) {
            throw new Error(errorMessage);
        }

        if (existingUser.password !== password) {
            throw new Error(errorMessage);
        }

        this.authenticatedUser = existingUser;
    }

    isAuthenticated(): boolean {
        return new Boolean(this.authenticatedUser).valueOf();
    }

    logout(): void {
        this.authenticatedUser = undefined;
        this.router.navigate(['.'], { queryParams: { logout: true } });
    }
}
