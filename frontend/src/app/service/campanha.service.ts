import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CampanhaApi } from '../api/campanha.api';
import { CampanhaDTO, CriarCampanhaDTO, DoacaoDTO, EstenderPrazoDTO } from '../model/campanha.dto';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private campanhaApi = inject(CampanhaApi);

  buscarPorId(campanhaId: number): Observable<CampanhaDTO> {
    return this.campanhaApi.buscarPorId(campanhaId);
  }

  criarCampanha(request: CriarCampanhaDTO): Observable<CampanhaDTO> {
    if (!request.nome?.trim() || !request.descricao?.trim() || !request.dataInicio || !request.dataFim) {
      return throwError(() => new Error('Todos os campos obrigatórios (Nome, Descrição, Datas) devem ser preenchidos.'));
    }
    if (request.metaFundos <= 0) {
      return throwError(() => new Error('A meta de fundos deve ser um valor positivo.'));
    }
    if (new Date(request.dataFim) < new Date(request.dataInicio)) {
      return throwError(() => new Error('A data de fim não pode ser anterior à data de início.'));
    }
    return this.campanhaApi.criarCampanha(request);
  }

  atualizarCampanha(campanhaId: number, request: CriarCampanhaDTO): Observable<CampanhaDTO> {
    if (!request.nome?.trim() || !request.descricao?.trim() || !request.dataInicio || !request.dataFim) {
      return throwError(() => new Error('Todos os campos obrigatórios (Nome, Descrição, Datas) devem ser preenchidos.'));
    }
    if (request.metaFundos <= 0) {
      return throwError(() => new Error('A meta de fundos deve ser um valor positivo.'));
    }
    if (new Date(request.dataFim) < new Date(request.dataInicio)) {
      return throwError(() => new Error('A data de fim não pode ser anterior à data de início.'));
    }
    return this.campanhaApi.atualizarCampanha(campanhaId, request);
  }

  estenderPrazo(campanhaId: number, request: EstenderPrazoDTO): Observable<CampanhaDTO> {
    if (!request.novaDataFim) {
      return throwError(() => new Error('A nova data de fim é obrigatória.'));
    }
    if (new Date(request.novaDataFim) < new Date()) { 
      return throwError(() => new Error('A nova data de fim não pode ser no passado.'));
    }
    return this.campanhaApi.estenderPrazo(campanhaId, request);
  }

  encerrarCampanha(campanhaId: number): Observable<CampanhaDTO> { 
    return this.campanhaApi.encerrarCampanha(campanhaId);
  }

  registrarDoacao(campanhaId: number, request: DoacaoDTO): Observable<DoacaoDTO> {
    if (request.valor <= 0) {
      return throwError(() => new Error('O valor da doação deve ser maior que zero.'));
    }
    return this.campanhaApi.registrarDoacao(campanhaId, request);
  }
}
