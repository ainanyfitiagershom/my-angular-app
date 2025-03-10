import { Routes } from '@angular/router';
import { RegisterComponent } from './views/auth/register/register.component';
import { LoginComponent } from './views/auth/login/login.component';
import { FirstViewComponent } from './views/user/first-view/first-view.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},

    { path: 'login', component: LoginComponent },

    { path: 'register', component: RegisterComponent},

    { path: 'first_view_client', component: FirstViewComponent}
];

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });

