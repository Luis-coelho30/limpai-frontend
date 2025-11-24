import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { VoluntarioApi } from '../api/voluntario.api';
import { PatrocinadorApi } from '../api/patrocinador.api';
import { VoluntarioDTO } from '../model/voluntario.dto';
import { PatrocinadorDTO } from '../model/patrocinador.dto';
import { InscricaoService } from './inscricao.service';
import { PagedRequest, PagedResponse } from '../model/paged.model';
import { InscricaoDTO } from '../model/inscricao.dto';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private authService = inject(AuthService);
  private voluntarioApi = inject(VoluntarioApi);
  private patrocinadorApi = inject(PatrocinadorApi);
  private inscricaoService = inject(InscricaoService);

  buscarPerfil(): Observable<VoluntarioDTO | PatrocinadorDTO | null> {
    const role = this.authService.getRole();
    if (role === 'VOLUNTARIO') {
      return this.voluntarioApi.buscarPerfil();
    } else if (role === 'PATROCINADOR') {
      return this.patrocinadorApi.buscarPerfil();
    } else {
      return of(null);
    }
  }
  
  listarInscricoes(request: PagedRequest): Observable<PagedResponse<InscricaoDTO>> {
    return this.inscricaoService.listarInscricoes(request);
  }
}