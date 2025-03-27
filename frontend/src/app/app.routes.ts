import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../../auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path:'event',
        component:AddEventComponent,
    },
    {
        path:'view',
        component:ViewEventComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'admin-register',
        component:AdminRegisterComponent,
    },
    {
        path:'admin',
        component:AdminComponent,
    },
    {
        path: '**',
        component:ViewEventComponent,
    }
];
