import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanhaDTO, DoacaoDTO, EstenderPrazoDTO } from '../../model/campanha.dto';
import { CampanhaComponent } from '../components/campanha-component/campanha.component';
import { DoacaoModalComponent } from '../components/doacao-component/doacao-modal.component';
import { EstenderPrazoModalComponent } from '../components/estender-component/estender-prazo-modal.component';
import { catchError, of, switchMap } from 'rxjs';
import { CampanhaService } from '../../service/campanha.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-campanha-page',
  standalone: true,
  imports: [
    CommonModule,
    CampanhaComponent,
    DoacaoModalComponent,
    EstenderPrazoModalComponent
  ],
  templateUrl: './campanha.html',
  styleUrl: './campanha.css'
})
export class CampanhaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private campanhaService = inject(CampanhaService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  campanha: CampanhaDTO | null = null;
  canManage: boolean = false; 

  showDoacaoModal = false;
  showEstenderPrazoModal = false;
  modalErrorMessage: string | null = null;
  currentCampanhaId: number | null = null;

  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'error'>('success');


  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.currentCampanhaId = +id;
          this.campanha = null; 
          return this.campanhaService.buscarPorId(this.currentCampanhaId);
        }
        return of(null); 
      })
    ).subscribe(data => {
      this.campanha = data;
      const isManagementRoute = this.router.url.includes('/perfil-empresa');
      this.canManage = isManagementRoute && this.authService.getRole() === 'PATROCINADOR';
      this.cdr.detectChanges(); 
    });
  }

  handleDonate(campanhaId: number): void {
    this.currentCampanhaId = campanhaId;
    this.showDoacaoModal = true;
  }

  handleExtendDeadline(campanhaId: number): void {
    this.currentCampanhaId = campanhaId;
    this.showEstenderPrazoModal = true;
  }

  handleEdit(): void {
    this.router.navigate(['/campanhas', this.currentCampanhaId, 'editar']);
  }

  handleEndCampaign(campanhaId: number): void {
    if (confirm('Tem certeza que deseja encerrar esta campanha?')) {
      this.campanhaService.encerrarCampanha(campanhaId).subscribe(updatedCampanha => {
        this.campanha = updatedCampanha;
        alert('Campanha encerrada com sucesso!');
      });
    }
  }

  handleSignUp(): void {
    // TODO: Chamar o futuro InscriçãoService
    alert('Funcionalidade de inscrição a ser implementada.');
  }

  closeModal(): void {
    this.showDoacaoModal = false;
    this.showEstenderPrazoModal = false;
    this.modalErrorMessage = null;
  }

  confirmDoacao(doacao: DoacaoDTO): void {
    if (this.currentCampanhaId) {
      this.campanhaService.registrarDoacao(this.currentCampanhaId, doacao)
        .pipe(
          catchError(err => {
            this.modalErrorMessage = err.message;
            return of(null); 
          })
        )
        .subscribe(doacaoResponse => {
          if (doacaoResponse && this.campanha) { 
            this.campanha.fundosArrecadados = doacaoResponse.valor;
            this.displayToast('Doação registrada com sucesso!', 'success');
            this.closeModal();
            this.cdr.detectChanges(); 
          }
        });
    }
  }

  confirmEstenderPrazo(prazo: EstenderPrazoDTO): void {
    if (this.currentCampanhaId) {
      this.campanhaService.estenderPrazo(this.currentCampanhaId, prazo)
        .pipe(
          catchError(err => {
            this.modalErrorMessage = err.message;
            return of(null);
          })
        )
        .subscribe(updatedCampanha => {
          if (updatedCampanha) {
            this.campanha = updatedCampanha; 
            alert('Prazo estendido com sucesso!');
            this.closeModal();
          }
        });
    }
  }

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}