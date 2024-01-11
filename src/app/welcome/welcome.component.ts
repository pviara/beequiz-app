import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'welcome',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
    private router = inject(Router);
    private userService = inject(UserService);

    onNext(): void {
        this.userService.welcomeUser().subscribe({
            next: () => {
                this.router.navigate(['../home']);
            },
        });
    }
}
