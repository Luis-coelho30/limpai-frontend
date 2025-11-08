import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rankings.html',
})
export class Rankings {
  fundosArrecadados = [
    { nome: 'EcoViva', valor: 125000 },
    { nome: 'Verde Futuro', valor: 98000 },
    { nome: 'ReciclaMais', valor: 75500 },
  ];

  maisVoluntarios = [
    { nome: 'AjudaAí', voluntarios: 420 },
    { nome: 'Coração Verde', voluntarios: 375 },
    { nome: 'Solidarize', voluntarios: 340 },
  ];

  maisCampanhas = [
    { nome: 'EcoViva', campanhas: 15 },
    { nome: 'MudaMundo', campanhas: 12 },
    { nome: 'PlanetaLimpo', campanhas: 10 },
  ];
}
