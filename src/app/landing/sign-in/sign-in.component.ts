import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInForm } from './model/sign-in-form';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../forms.styles.scss', './sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    errorMessage = '';
    signedInMessage = '';

    signInForm!: FormGroup<SignInForm>;

    private authService = inject(AuthService);
    private formBuilder = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    ngOnInit(): void {
        this.signInForm = this.formBuilder.nonNullable.group({
            username: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
            password: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
        });

        const { token } = this.route.snapshot.queryParams;
        if (token) {
            this.authService.getAuthenticatedUserFrom(token).subscribe({
                next: () => this.router.navigate(['../welcome']),
            });
        }
    }

    getGoogleSignInLink(): string {
        return `${environment.API_URL}/auth/google`;
    }

    onSignIn(form: FormGroup<SignInForm>): void {
        if (form.invalid || !form.value.username || !form.value.password) {
            return;
        }

        this.authService
            .signIn(form.value.username, form.value.password)
            .subscribe({
                next: () => {
                    this.errorMessage = '';
                    this.signedInMessage = '🔐 Vous êtes connecté·e !';

                    this.signInForm.disable();

                    setTimeout(() => {
                        this.router.navigate(['../welcome']);
                    }, 2000);
                },
                error: () => {
                    this.errorMessage =
                        'Mauvais identifiant et/ou mot de passe.';
                },
            });
    }
}
