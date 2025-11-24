import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService } from '../../../service/perfil.service';
import { InscricaoDTO } from '../../../model/inscricao.dto';
import { PagedRequest } from '../../../model/paged.model';
import { TempoRestantePipe } from '../../../pipes/tempo-restante.pipe';

@Component({
  selector: 'app-feed-inscricao',
  standalone: true,
  imports: [CommonModule, TempoRestantePipe],
  templateUrl: './feed-inscricao.component.html',
  styleUrls: ['./feed-inscricao.component.css']
})
export class FeedInscricaoComponent implements OnInit {
  private perfilService = inject(PerfilService);
  private router = inject(Router);

  inscricoes = signal<InscricaoDTO[]>([]);
  paginaAtual = 0;
  totalPaginas = 0;

  ngOnInit() {
    this.carregarInscricoes();
  }

  carregarMais() {
    this.paginaAtual++;
    this.carregarInscricoes();
  }

  carregarInscricoes() {
    const request: PagedRequest = { page: this.paginaAtual, size: 10 };
    this.perfilService.listarInscricoes(request).subscribe(response => {
      this.inscricoes.update(atuais => [...atuais, ...response.content]);
      this.totalPaginas = response.totalPages;
    });
  }

  navegarParaCampanha(campanhaId: number) {
    this.router.navigate(['/campanhas', campanhaId]);
  }
}
