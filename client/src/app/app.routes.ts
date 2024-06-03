import { Routes } from '@angular/router';

import { UsersComponent } from './components/users.component';
import { ReportComponent } from './components/report.component';

export enum ROUTER_TOKENS {
    HOME = 'home',
    REPORT = 'report'
}

export const routes: Routes = [
    {
        path:'',
        redirectTo: ROUTER_TOKENS.HOME,
        pathMatch: 'full'
    },
    {
        path: ROUTER_TOKENS.HOME,
        component: UsersComponent
    },
    {
        path: ROUTER_TOKENS.REPORT,
        component: ReportComponent
    }
];
