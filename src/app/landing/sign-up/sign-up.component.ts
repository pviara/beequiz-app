import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpForm } from './model/sign-up-form';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/user';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../forms.styles.scss', './sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    errorMessage = '';
    signedUpMessage = '';

    signUpForm!: FormGroup<SignUpForm>;

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private userService = inject(UserService);

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.nonNullable.group({
            username: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
            password: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
        });
    }

    onSignUp(form: FormGroup<SignUpForm>): void {
        if (form.invalid || !form.value.username || !form.value.password) {
            return;
        }

        this.userService
            .addUser(form.value.username, form.value.password)
            .subscribe({
                next: () => {
                    this.errorMessage = '';
                    this.signedUpMessage = 'Compte créé ! 👋 Bienvenue !';

                    this.signUpForm.disable();

                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 2000);
                },
                error: () => {
                    this.errorMessage = `L'utilisateur "${form.value.username}" existe déjà !`;
                },
            });
    }
}
