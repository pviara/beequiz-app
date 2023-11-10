import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LandingModule } from './landing/landing.module';
import { RouterOutlet } from '@angular/router';
import { UserService } from './core/user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, LandingModule, RouterOutlet],
    providers: [AuthService, UserService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
