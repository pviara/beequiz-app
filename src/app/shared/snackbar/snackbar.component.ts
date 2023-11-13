import { Component, Input } from '@angular/core';

@Component({
    selector: 'snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
    @Input()
    errorMessage!: string;

    @Input()
    successMessage!: string;

    mustAnyMessageBeDisplayed(): boolean {
        return (
            new Boolean(this.errorMessage).valueOf() ||
            new Boolean(this.successMessage).valueOf()
        );
    }
}
