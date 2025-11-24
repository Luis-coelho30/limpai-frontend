import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedService } from '../../../service/feed.service';
import { CampanhaMinDTO } from '../../../model/campanha.dto';
import { PagedRequest } from '../../../model/paged.model';
import { TempoRestantePipe } from '../../../pipes/tempo-restante.pipe';

@Component({
  selector: 'app-feed-campanhas-criadas',
  standalone: true,
  imports: [CommonModule, TempoRestantePipe],
  templateUrl: './feed-campanhas-criadas.component.html',
  styleUrls: ['./feed-campanhas-criadas.component.css']
})
export class FeedCampanhasCriadasComponent implements OnInit {
  private feedService = inject(FeedService);
  private router = inject(Router);

  campanhas = signal<CampanhaMinDTO[]>([]);
  paginaAtual = 0;
  totalPaginas = 0;

  ngOnInit() {
    this.carregarCampanhas();
  }

  carregarMais() {
    this.paginaAtual++;
    this.carregarCampanhas();
  }

  carregarCampanhas() {
    const request: PagedRequest = { page: this.paginaAtual, size: 10 };
    this.feedService.listarCampanhasPorUsuario(request).subscribe(response => {
      this.campanhas.update(atuais => [...atuais, ...response.content]);
      this.totalPaginas = response.totalPages;
    });
  }

  navegarParaCampanha(campanhaId: number) {
    this.router.navigate(['/campanhas', campanhaId], { state: { fromProfile: true } });
  }
}