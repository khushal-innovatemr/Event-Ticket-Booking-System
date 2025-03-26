import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

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
    },
    {
        path: '**',
        component:ViewEventComponent,
    }
];
