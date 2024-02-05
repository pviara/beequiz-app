import { Component, Input, input } from '@angular/core';

@Component({
    selector: 'snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
    errorMessage = input<string>();

    successMessage = input<string>();

    mustAnyMessageBeDisplayed(): boolean {
        return (
            new Boolean(this.errorMessage()).valueOf() ||
            new Boolean(this.successMessage()).valueOf()
        );
    }
}
