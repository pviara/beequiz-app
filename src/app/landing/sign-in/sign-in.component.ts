import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInForm } from './sign-in-form';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    signInForm!: FormGroup<SignInForm>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.signInForm = this.formBuilder.nonNullable.group({
            username: this.formBuilder.nonNullable.control(''),
            password: this.formBuilder.nonNullable.control(''),
        });
    }

    onSignIn(form: FormGroup<SignInForm>): void {
        console.log(form.value);
    }
}
