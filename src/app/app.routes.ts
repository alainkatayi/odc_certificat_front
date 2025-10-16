
import { Routes } from '@angular/router';


export const routes: Routes = [

    {
        path: '',
        title: 'login',
        loadComponent: () =>
            import('../app/pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'dashboard',
        title: 'dashboard',
        loadComponent: () =>
            import('../app/pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
        path: 'formation-list',
        title: 'formation',
        loadComponent: () =>
            import('../app/pages/admin/formation-list/formation-list.component').then((m) => m.FormationListComponent),
    },
    {
        path: 'formation/:id',
        title: 'formation-single',
        loadComponent: () =>
            import('../app/pages/admin/formation-single/formation-single.component').then((m) => m.FormationSingleComponent),
    },
    {
        path: 'participant-list',
        title: 'participant',
        loadComponent: () =>
            import('../app/pages/admin/participant-list/participant-list.component').then((m) => m.ParticipantListComponent),
    },
    {
        path: 'certificat-list',
        title: 'certificat',
        loadComponent: () =>
            import('../app/pages/admin/certificat-list/certificat-list.component').then((m) => m.CertificatListComponent),
    },
    {
        path: 'create-formation',
        title: 'create-formation',
        loadComponent: () =>
            import('../app/pages/admin/formation-create/formation-create.component').then((m) => m.FormationCreateComponent),
    },

];
