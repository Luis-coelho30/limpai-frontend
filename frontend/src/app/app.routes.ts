import { Routes } from '@angular/router';
import { Sobre } from './pages/sobre/sobre';
import { Rankings } from './pages/rankings/rankings';
import { Guia } from './pages/guia/guia';
import { Empresas } from './pages/empresas/empresas';
import { Voluntarios } from './pages/voluntarios/voluntarios';

export const routes: Routes = [
    { path: '', component: Sobre },
    { path: 'guia', component: Guia},
    { path: 'rankings', component: Rankings},
    { path: 'sobre', component: Sobre },
    { path: 'empresas', component: Empresas },
    { path: 'voluntarios', component: Voluntarios }
];