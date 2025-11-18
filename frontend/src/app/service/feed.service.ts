/* serve de exemplo enquanto não tem o back-end conectado.
uma vez que integrar, esse serviço pode pegar as listas de campanhas, agindo como ponte*/

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FeedService {
  private campanhas = [
    { id: 1, titulo: 'Campanha A', tipo: 'praia', ano: 2023, descricao: 'Descrição da campanha A' },
    { id: 2, titulo: 'Campanha B', tipo: 'rio', ano: 2021, descricao: 'Descrição da campanha B' },
    { id: 3, titulo: 'Campanha C', tipo: 'praia', ano: 2020, descricao: 'Descrição da campanha C' },
    { id: 4, titulo: 'Campanha D', tipo: 'rua', ano: 2022, descricao: 'Descrição da campanha D' },
    { id: 5, titulo: 'Campanha E', tipo: 'rua', ano: 2025, descricao: 'Descrição da campanha E' },
    { id: 6, titulo: 'Campanha F', tipo: 'parque', ano: 2024, descricao: 'Descrição da campanha F' },
    { id: 7, titulo: 'Campanha G', tipo: 'parque', ano: 2024, descricao: 'Descrição da campanha G' },
    { id: 8, titulo: 'Campanha H', tipo: 'praia', ano: 2019, descricao: 'Descrição da campanha H' },
    { id: 9, titulo: 'Campanha I', tipo: 'rio', ano: 2022, descricao: 'Descrição da campanha I' },
    { id: 10, titulo: 'Campanha J', tipo: 'rio', ano: 2025, descricao: 'Descrição da campanha J' },
    { id: 11, titulo: 'Campanha K', tipo: 'parque', ano: 2023, descricao: 'Descrição da campanha K' },
  ];

  constructor() {}

  listarCampanhas(): Observable<any[]> {
    const ordenadas = [...this.campanhas].sort((a, b) => b.ano - a.ano);
    return of(ordenadas);
  }
}
