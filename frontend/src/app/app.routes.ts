import { Routes } from '@angular/router';
import { Sobre } from './pages/sobre/sobre';
import { Rankings } from './pages/rankings/rankings';
import { Guia } from './pages/guia/guia';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
    { path: '', component: Sobre }, //página sobre: landing page
    { path: 'guia', component: Guia},
    { path: 'rankings', component: Rankings},
    { path: 'sobre', component: Sobre },
    { path: 'login', component: Login}, //página de login
    { path: 'cadastro', component: Cadastro} //página de cadastro
];