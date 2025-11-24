import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanhaComponent } from '../components/campanha-component/campanha.component';
import { CampanhaDTO, CriarCampanhaDTO } from '../../model/campanha.dto';
import { CampanhaService } from '../../service/campanha.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-editar-campanha-page',
  standalone: true,
  imports: [CommonModule, CampanhaComponent],
  templateUrl: './editar-campanha-page.html',
})
export class EditarCampanhaPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private campanhaService = inject(CampanhaService);

  campanha = signal<CampanhaDTO | null>(null);
  errorMessage = signal<string | null>(null);
  campanhaId: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.campanhaId = +id;
          return this.campanhaService.buscarPorId(this.campanhaId);
        }
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.campanha.set(data);
      } else {
        this.router.navigate(['/feed']); 
      }
    });
  }

  handleSave(campanhaData: CriarCampanhaDTO) {
    if (!this.campanhaId) return;

    this.campanhaService.atualizarCampanha(this.campanhaId, campanhaData).pipe(
      catchError(err => {
        this.errorMessage.set(err.message || 'Ocorreu um erro ao atualizar a campanha.');
        return of(null);
      })
    ).subscribe(campanhaAtualizada => {
      if (campanhaAtualizada) {
        this.router.navigate(['/campanhas', campanhaAtualizada.campanhaId]);
      }
    });
  }

  handleCancel() {
    this.router.navigate(['/campanhas', this.campanhaId]);
  }
}
