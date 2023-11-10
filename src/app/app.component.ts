import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LandingModule } from './landing/landing.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, LandingModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
