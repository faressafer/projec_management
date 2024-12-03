import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [


    { path: '', redirectTo: 'dashboard' , pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotfoundComponent},

];
