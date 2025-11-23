import { Routes } from '@angular/router';
import { Sobre } from './pages/sobre/sobre';
import { Rankings } from './pages/rankings/rankings';
import { Guia } from './pages/guia/guia';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { PerfilVoluntario } from './pages/perfil-voluntario/perfil-voluntario';
import { PerfilEmpresa } from './pages/perfil-empresa/perfil-empresa';
import { LocaisComponent } from './pages/locais/locais.component';
import { CampanhaPage } from './pages/campanha/campanha';
import { CriarCampanhaPage } from './pages/criar-campanha/criar-campanha-page';
import { FeedCampanhas } from './pages/feed-campanhas/feed-campanhas';
import { CriarLocalComponent } from './pages/components/criar-local/criar-local.component';

export const routes: Routes = [
    { path: '', component: Sobre }, //página sobre: landing page
    { path: 'guia', component: Guia },
    { path: 'rankings', component: Rankings },
    { path: 'sobre', component: Sobre },
    { path: 'locais', component: LocaisComponent }, //página de locais
    { path: 'login', component: Login }, //página de login
    { path: 'cadastro', component: Cadastro }, //página de cadastro
    { path: 'perfil-voluntario', component: PerfilVoluntario }, //página de perfil de usuário
    { path: 'perfil-empresa', component: PerfilEmpresa }, //página de perfil de empresa
    { path: 'criar-local', component: CriarLocalComponent }, //página de criação de locais
    { path: 'criar-campanha', component: CriarCampanhaPage }, //página de criação de campanha
    { path: 'campanhas/:id', component: CampanhaPage }, //página de detalhes da campanha
    { path: 'feed-campanhas', component: FeedCampanhas }, //página de feed de campanhas
];