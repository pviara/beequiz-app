import { Component, OnInit } from '@angular/core';
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

    signUpForm!: FormGroup<SignUpForm>;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
    ) {}

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

        const userToAdd = new User(form.value.username, form.value.password);
        try {
            this.userService.add(userToAdd);
            this.router.navigate(['..']);
        } catch (error: any) {
            this.errorMessage = error.message;
        }
    }
}
