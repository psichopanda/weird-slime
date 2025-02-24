import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        providers: [{
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleClient,
            { 
              scopes: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/spreadsheets.readonly',
              ],
              oneTapEnabled: false,
            }
          )
        }],
        onError: err => console.error(err)
      } as SocialAuthServiceConfig,
    }
  ]
};
