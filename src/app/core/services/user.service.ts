import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private registeredUsers: User[] = [
        // new User('reginald', 'access'), // TODO remove this
    ];

    add(user: User): void {
        const existingUser = this.findByUsername(user.username);
        if (existingUser) {
            throw new Error(`L'utilisateur "${user.username}" existe déjà !`);
        }

        this.registeredUsers.push(user);
    }

    findByUsername(username: string): User | undefined {
        return this.registeredUsers.find((user) =>
            this.compareStrings(user.username, username),
        );
    }

    private compareStrings(str1: string, str2: string): boolean {
        return str1.toLowerCase() === str2.toLowerCase();
    }
}
