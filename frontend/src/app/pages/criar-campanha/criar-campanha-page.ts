import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CampanhaComponent } from '../components/campanha-component/campanha.component';
import { CriarCampanhaDTO } from '../../model/campanha.dto';
import { CampanhaService } from '../../service/campanha.service';
import { catchError, of } from 'rxjs';
import { LocaisCarrosselComponent } from '../components/locais-carrossel/locais-carrossel.component';

@Component({
  selector: 'app-criar-campanha-page',
  standalone: true,
  imports: [CommonModule, CampanhaComponent, LocaisCarrosselComponent],
  templateUrl: './criar-campanha-page.html',
  styleUrl: './criar-campanha-page.css'
})
export class CriarCampanhaPage {
  private router = inject(Router);
  private campanhaService = inject(CampanhaService);

  localSelecionadoId: number | null = null;
  localSelecionadoNome: string | null = null;
  errorMessage: string | null = null;

  selecionarLocal({ id, nome }: { id: number, nome: string }) {
    this.localSelecionadoId = id;
    this.localSelecionadoNome = nome;
  }

  handleSave(campanhaData: CriarCampanhaDTO) {
    this.campanhaService.criarCampanha(campanhaData)
      .pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return of(null);
        })
      ).subscribe(novaCampanha => {
        if (novaCampanha) {
          this.errorMessage = null; 
          this.router.navigate(['/campanhas', novaCampanha.campanhaId]);
        }
      });
  }

  handleCancel() {
    this.localSelecionadoId = null;
    this.localSelecionadoNome = null;
    this.errorMessage = null; 
  }
}
