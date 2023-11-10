import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authenticatedUser?: User;

    constructor(private userService: UserService) {}

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
}
