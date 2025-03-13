import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'inscription', loadComponent: () => import('./views/auth/register/register.component').then(m => m.RegisterComponent) },
];

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes),
      provideHttpClient(),
      importProvidersFrom(ReactiveFormsModule),
    ],
};
