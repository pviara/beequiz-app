import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationService } from './app/core/services/navigation.service';

bootstrapApplication(AppComponent, appConfig)
    .then((appRef) => {
        const navigationService = appRef.injector.get(NavigationService);
        navigationService.activateQuizQuitPrevention();
    })
    .catch((err) => console.error(err));
