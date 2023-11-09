import { Component, OnInit } from '@angular/core';
import { SignUpForm } from './sign-up-form';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../forms.styles.scss', './sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    signUpForm!: FormGroup<SignUpForm>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.nonNullable.group({
            username: this.formBuilder.nonNullable.control(''),
            password: this.formBuilder.nonNullable.control(''),
        });
    }

    onSignUp(form: FormGroup<SignUpForm>): void {
        console.log(form.value);
    }
}
