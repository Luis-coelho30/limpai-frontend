import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoacaoDTO } from '../model/campanha.dto';
import { PagedRequest, PagedResponse } from '../model/paged.model';
import { InscricaoApi } from '../api/inscricao.api';
import { InscricaoDTO } from '../model/inscricao.dto';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {
  private inscricaoApi = inject(InscricaoApi);

  listarInscricoes(request: PagedRequest): Observable<PagedResponse<InscricaoDTO>> {
    return this.inscricaoApi.listarInscricoes(request);
  }

  inscrever(campanhaId: number, request: DoacaoDTO | null): Observable<InscricaoDTO> {
    return this.inscricaoApi.inscrever(campanhaId, request);
  }

  desinscrever(campanhaId: number): Observable<void> {
    return this.inscricaoApi.desinscrever(campanhaId);
  }
}
