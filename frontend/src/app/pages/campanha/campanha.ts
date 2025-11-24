import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanhaDTO, DoacaoDTO, EstenderPrazoDTO } from '../../model/campanha.dto';
import { CampanhaComponent } from '../components/campanha-component/campanha.component';
import { DoacaoModalComponent } from '../components/doacao-component/doacao-modal.component';
import { EstenderPrazoModalComponent } from '../components/estender-component/estender-prazo-modal.component';
import { ConfirmModalComponent } from '../components/cofirm-modal/confirm-modal.component';
import { catchError, of, switchMap, Observable } from 'rxjs';
import { CampanhaService } from '../../service/campanha.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-campanha-page',
  standalone: true,
  imports: [
    CommonModule,
    CampanhaComponent,
    DoacaoModalComponent,
    EstenderPrazoModalComponent,
    ConfirmModalComponent
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
  showConfirmEncerramentoModal = false;
  modalErrorMessage: string | null = null;
  currentCampanhaId: number | null = null;

  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'error'>('success');

  private isFromProfile: boolean = false;
  isSubscribed = signal<boolean>(false);

  constructor() {
    const navigation = this.router.currentNavigation();
    this.isFromProfile = navigation?.extras.state?.['fromProfile'] ?? false;
  }


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
      this.canManage = this.isFromProfile && this.authService.getRole() === 'PATROCINADOR';
      this.isSubscribed.set(data?.usuarioInscrito ?? false);
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
    this.currentCampanhaId = campanhaId;
    this.showConfirmEncerramentoModal = true;
  }

  confirmEncerramento(): void {
    if (!this.currentCampanhaId) return;
    this.campanhaService.encerrarCampanha(this.currentCampanhaId).subscribe(updatedCampanha => {
      this.campanha = { ...this.campanha, ...updatedCampanha };
      this.displayToast('Campanha encerrada com sucesso!', 'success');
      this.closeModal();
    });
  }

  handleSignUp(): void {
    if (!this.currentCampanhaId) return;

    const action:Observable<any> = this.isSubscribed()
      ? this.campanhaService.desinscrever(this.currentCampanhaId)
      : this.campanhaService.inscrever(this.currentCampanhaId);

    action.subscribe({
      next: () => {
        const newSubscribedState = !this.isSubscribed();
        this.isSubscribed.set(newSubscribedState);
        
        if (this.campanha) {
          this.campanha.qtdInscritos += newSubscribedState ? 1 : -1;
          this.campanha.usuarioInscrito = newSubscribedState;
          const message = newSubscribedState ? 'Inscrição realizada com sucesso!' : 'Inscrição cancelada.';
          this.displayToast(message, 'success');
        }
      }
    });
  }

  closeModal(): void {
    this.showDoacaoModal = false;
    this.showEstenderPrazoModal = false;
    this.showConfirmEncerramentoModal = false;
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
            this.campanha = { ...this.campanha, ...doacaoResponse };
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
            this.displayToast('Prazo estendido com sucesso!', 'success');
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