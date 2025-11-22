import { ChangeDetectionStrategy, Component, OnInit, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalService } from '../../service/local.service';
import { LocalResponse } from '../../model/local.dto';
import { PagedRequest } from '../../model/paged.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locais.html',
  styleUrls: ['./locais.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocaisComponent implements OnInit {
  private localService = inject(LocalService);

  readonly imagens = [
    '../assets/voluntarios-limpando-cidade.jpg',
    '../assets/limpadores-de-rua.jpg',
    '../assets/voluntarios-ilustracao.jpg'
  ];

  locais = signal<LocalResponse[]>([]);
  paginaAtual = signal(0);
  totalPaginas = signal(0);
  carregando = signal(true);
  erro = signal<string | null>(null);

  constructor() {
    register();
  }

  ngOnInit(): void {
    this.carregarLocais(0);
  }

  carregarLocais(pagina: number): void {
    this.carregando.set(true);
    this.erro.set(null);

    const request: PagedRequest = {
      page: pagina,
      size: 9, 
    };

    this.localService.listarLocais(request).subscribe({
      next: (resposta) => {
        this.locais.set(resposta.content);
        this.paginaAtual.set(resposta.number);
        this.totalPaginas.set(resposta.totalPages);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar locais:', err);
        this.erro.set('Não foi possível carregar os locais. Tente novamente mais tarde.');
        this.carregando.set(false);
      },
    });
  }

  paginaAnterior(): void {
    if (this.paginaAtual() > 0) {
      this.carregarLocais(this.paginaAtual() - 1);
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual() < this.totalPaginas() - 1) {
      this.carregarLocais(this.paginaAtual() + 1);
    }
  }
}