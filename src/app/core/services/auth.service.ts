import { SignedInUser } from '../model/signed-in-user';
import {
    BehaviorSubject,
    Observable,
    catchError,
    of,
    switchMap,
    tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

const SIGNED_IN_USER_STORAGE_KEY = 'signed_in_user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    get signedInUser(): SignedInUser | null {
        if (isPlatformBrowser(this.platformId)) {
            const fromStorage = localStorage.getItem(
                SIGNED_IN_USER_STORAGE_KEY,
            );
            if (!fromStorage) {
                return null;
            }

            return JSON.parse(fromStorage);
        }
        return null;
    }

    set signedInUser(value: SignedInUser | null) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(SIGNED_IN_USER_STORAGE_KEY);

            if (value) {
                localStorage.setItem(
                    SIGNED_IN_USER_STORAGE_KEY,
                    JSON.stringify(value),
                );
            }

            this.signedInUser$.next(value);
        }
    }

    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    private authEndpoint = `${environment.API_URL}/auth`;

    private signedInUser$ = new BehaviorSubject(this.signedInUser);

    constructor() {
        if (this.signedInUser) {
            const { token } = this.signedInUser;
            this.checkToken(token).subscribe();
        }
    }

    isAuthenticated(): boolean {
        return new Boolean(this.signedInUser$.value).valueOf();
    }

    logout(): void {
        this.signedInUser = null;
        this.router.navigate(['.'], { queryParams: { logout: true } });
    }

    signIn(username: string, password: string): Observable<SignedInUser> {
        return this.httpClient
            .post<SignedInUser>(this.authEndpoint, {
                username,
                password,
            })
            .pipe(
                tap((signedInUser) => {
                    this.signedInUser = signedInUser;
                }),
            );
    }

    private checkToken(token: string): Observable<any> {
        return this.httpClient
            .get(this.authEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                observe: 'response',
            })
            .pipe(
                catchError((response) => {
                    if (response.status === HttpStatusCode.Unauthorized) {
                        this.signedInUser = null;
                        this.router.navigate(['/home']);
                    }
                    return of(response);
                }),
            );
    }
}
