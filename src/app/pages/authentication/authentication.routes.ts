import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppLoginClientComponent } from './login-client/login-client.component';
import { AppRegisterClientComponent } from './register-client/register-client.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'login/client',
        component: AppLoginClientComponent,
      },
      {
        path: 'register/client',
        component: AppRegisterClientComponent,
      },
    ],
  },
];
