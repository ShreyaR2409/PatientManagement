import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; 
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component'; 
import { authGuard } from './services/auth.guard'
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import{ ChangePasswordComponent } from './components/change-password/change-password.component';
export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: 'forgetpassword',
        component: ForgetPasswordComponent
    },
    {
        path:'patient',
        component: PatientFormComponent
    },
    {
        path:'changepassword',
        component:ChangePasswordComponent
    },
    {
         path: '', redirectTo: 'login', pathMatch: 'full'
    },
];
