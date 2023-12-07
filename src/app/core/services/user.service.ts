import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private httpClient = inject(HttpClient);

    private userEndpoint = `${environment.API_URL}/user`;

    addUser(username: string, password: string): Observable<void> {
        return this.httpClient.post<void>(this.userEndpoint, {
            username,
            password,
        });
    }
}
