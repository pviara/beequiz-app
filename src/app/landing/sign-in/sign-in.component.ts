import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInForm } from './model/sign-in-form';
import { User } from '../../core/model/user';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../forms.styles.scss', './sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    signedInMessage = '';

    errorMessage = '';

    signInForm!: FormGroup<SignInForm>;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.signInForm = this.formBuilder.nonNullable.group({
            username: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
            password: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
        });
    }

    onSignIn(form: FormGroup<SignInForm>): void {
        if (form.invalid || !form.value.username || !form.value.password) {
            return;
        }

        const userToAuthenticate = new User(
            form.value.username,
            form.value.password,
        );

        try {
            this.authService.authenticate(
                userToAuthenticate.username,
                userToAuthenticate.password,
            );

            this.signedInMessage = 'Vous êtes connecté·e !';

            setTimeout(() => {
                this.router.navigate(['../welcome']);
            }, 2000);
        } catch (error: any) {
            this.errorMessage = error.message;
        }
    }
}
