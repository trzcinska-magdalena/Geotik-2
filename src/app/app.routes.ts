import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: LoginRegistrationComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
];
