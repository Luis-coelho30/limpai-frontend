import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../service/feed.service';

@Component({
  selector: 'app-feed-campanhas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-campanhas.html',
  styleUrls: ['./feed-campanhas.css']
})
export class FeedCampanhas implements OnInit {
  campanhas: any[] = [];
  campanhasVisiveis: any[] = [];
  campanhaSelecionada: any = null;
  itensPorPagina = 10;
  paginaAtual = 1;

  usuario = {
    nome: 'Ruiz Setembro Lebre',
    titulo: 'Estudante de Jogos Digitais na PUC-SP',
    fotoUrl: 'https://placehold.co/100x100/10b981/ffffff/png?text=RL',
  };

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.feedService.listarCampanhas().subscribe((data) => {
      this.campanhas = data;
      this.atualizarCampanhasVisiveis();
    });
  }

  atualizarCampanhasVisiveis() {
    const limite = this.paginaAtual * this.itensPorPagina;
    this.campanhasVisiveis = this.campanhas.slice(0, limite);
  }

  carregarMais() {
    this.paginaAtual++;
    this.atualizarCampanhasVisiveis();
  }

  abrirJanelaCampanha(campanha: any) {
    this.campanhaSelecionada = campanha;
  }

  fecharJanelaCampanha() {
    this.campanhaSelecionada = null;
  }
}
