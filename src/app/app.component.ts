import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    noErrorThrown = true;

    handleImageError(): void {
        this.noErrorThrown = false;
    }

    getQRCode(): string {
        const encodedURI = encodeURI(environment.WEB_URL);
        return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedURI}&size=250x250&bgcolor=254-236-217`;
    }
}
