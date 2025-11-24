import { ChangeDetectionStrategy, Component, OnInit, signal, inject, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalService } from '../../../service/local.service';
import { AuthService } from '../../../service/auth.service';
import { LocalResponse } from '../../../model/local.dto';
import { PagedRequest } from '../../../model/paged.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-locais-carrossel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locais-carrossel.component.html',
  styleUrls: ['./locais-carrossel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocaisCarrosselComponent implements OnInit {
  private localService = inject(LocalService);
  private router = inject(Router);
  private authService = inject(AuthService);

  @Output() localSelecionado = new EventEmitter<{ id: number, nome: string }>();

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
  podeCriarLocal = signal(false);

  constructor() {
    register();
  }

  ngOnInit(): void {
    this.carregarLocais(0);
    this.podeCriarLocal.set(this.authService.getRole() === 'PATROCINADOR');
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

  selecionarLocal(local: LocalResponse): void {
    this.localSelecionado.emit({ id: local.localId, nome: local.nome });
  }

  navegarParaCriarLocal(): void {
    this.router.navigate(['/criar-local'], { queryParams: { returnUrl: '/criar-campanha' } });
  }
}