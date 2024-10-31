import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule), // Add HttpClientModule here
    provideRouter(routes),
    AuthService,
    ApiService,
    provideStore(
      {auth: authReducer},
    ),
  ],
};

