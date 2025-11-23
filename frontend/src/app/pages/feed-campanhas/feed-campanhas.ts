import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeedService } from '../../service/feed.service';
import { CidadeService } from '../../service/cidade.service';
import { EstadoService } from '../../service/estado.service';
import { CampanhaMinDTO } from '../../model/campanha.dto';
import { AuthService } from '../../service/auth.service';
import { TempoRestantePipe } from '../../pipes/tempo-restante.pipe';
import { PagedRequest } from '../../model/paged.model';
import { EstadoResponse } from '../../model/estado.dto';
import { CidadeResponse } from '../../model/cidade.dto';

@Component({
  selector: 'app-feed-campanhas',
  standalone: true,
  imports: [CommonModule, FormsModule, TempoRestantePipe],
  templateUrl: './feed-campanhas.html',
  styleUrls: ['./feed-campanhas.css']
})
export class FeedCampanhas implements OnInit {
  private feedService = inject(FeedService);
  private router = inject(Router);
  private cidadeService = inject(CidadeService);
  private estadoService = inject(EstadoService);
  private authService = inject(AuthService);

  campanhas = signal<CampanhaMinDTO[]>([]);
  paginaAtual = 0;
  totalPaginas = 0;

  // Filtros
  estados = signal<EstadoResponse[]>([]);
  cidades = signal<CidadeResponse[]>([]);
  estadoIdSelecionado: number | null = null;
  cidadeIdSelecionada: number | null = null;
  mostrarHistorico = false;

  isAuthenticated = toSignal(this.authService.isAuthenticated$, { initialValue: false });

  usuario = {
    nome: 'Ruiz Setembro Lebre',
    titulo: 'Estudante de Jogos Digitais na PUC-SP',
    fotoUrl: 'https://placehold.co/100x100/10b981/ffffff/png?text=RL',
  };

  ngOnInit() {
    this.carregarEstados();
    this.aplicarFiltros(); 
  }

  carregarEstados() {
    this.estadoService.listarEstados().subscribe(data => this.estados.set(data));
  }

  onEstadoChange() {
    this.cidadeIdSelecionada = null; 
    if (this.estadoIdSelecionado) {
      this.cidadeService.listarCidadesPorEstado(this.estadoIdSelecionado).subscribe(data => this.cidades.set(data));
    } else {
      this.cidades.set([]);
    }
  }

  aplicarFiltros() {
    this.paginaAtual = 0; 
    this.campanhas.set([]); 
    this.carregarCampanhas();
  }

  carregarMais() {
    this.paginaAtual++;
    this.carregarCampanhas();
  }

  carregarCampanhas() {
    const filters: any = {
      historico: this.mostrarHistorico
    };
    if (this.cidadeIdSelecionada) filters.cidadeId = this.cidadeIdSelecionada;
    if (this.estadoIdSelecionado) filters.estadoId = this.estadoIdSelecionado;

    const request: PagedRequest = {
      page: this.paginaAtual,
      size: 10,
      filters: filters
    };

    this.feedService.listarCampanhas(request).subscribe(response => {
      this.campanhas.update(campanhasAtuais => [...campanhasAtuais, ...response.content]);
      this.totalPaginas = response.totalPages;
    });
  }

  navegarParaCampanha(campanhaId: number) {
    this.router.navigate(['/campanhas', campanhaId]);
  }
}
