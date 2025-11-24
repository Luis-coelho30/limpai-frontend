import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { InscricaoDTO } from "../model/inscricao.dto";
import { PagedRequest, PagedResponse } from "../model/paged.model";
import { DoacaoDTO } from "../model/campanha.dto";

@Injectable({
  providedIn: 'root'
})

export class InscricaoApi {
  private basePath = '/campanha'; 
  constructor(private apiClient: ApiClientService) {}

  listarInscricoes(request: PagedRequest): Observable<PagedResponse<InscricaoDTO>> {
    return this.apiClient.getPaged<InscricaoDTO>(`${this.basePath}/inscricoes/me`, request);
  }

  inscrever(campanhaId: number, request: DoacaoDTO | null): Observable<InscricaoDTO> {
    return this.apiClient.post<InscricaoDTO>(`${this.basePath}/${campanhaId}/inscricao`, request);
  }

  desinscrever(campanhaId: number): Observable<void> {
    return this.apiClient.delete<void>(`${this.basePath}/${campanhaId}/inscricao`);
  }
}