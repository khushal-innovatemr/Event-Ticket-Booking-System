import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';
import { RoleGuard } from './role.guard';
import { AdminGuard } from './admin.guard';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[RedirectGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate:[RedirectGuard]
    },
    {
        path:'event',
        component:AddEventComponent,    
        canActivate:[AuthGuard,AdminGuard]
    },
    {
        path:'view',
        component:ViewEventComponent,
        canActivate:[AuthGuard,AdminGuard]
    },
    {
        path:'admin-register',
        component:AdminRegisterComponent,
        canActivate:[RoleGuard]
    },
    {
        path:'admin-view',
        component:AdminViewComponent,
        canActivate:[RoleGuard]
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[RoleGuard]
    },
    {
        path:'user-view',
        component:UserViewComponent
    },
    {
        path: 'user',
        component:UserComponent
    }
   
];
