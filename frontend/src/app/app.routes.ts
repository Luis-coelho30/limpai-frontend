import { Routes } from '@angular/router';
import { Sobre } from './pages/sobre/sobre';
import { Empresas } from './pages/empresas/empresas';
import { Voluntarios } from './pages/voluntarios/voluntarios';

export const routes: Routes = [
    { path: '', redirectTo: '/sobre', pathMatch: 'full' },
    { path: 'sobre', component: Sobre },
    { path: 'empresas', component: Empresas },
    { path: 'voluntarios', component: Voluntarios }
];