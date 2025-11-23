import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { PagedRequest, PagedResponse } from "../model/paged.model";
import { CampanhaDTO, CampanhaMinDTO, CriarCampanhaDTO, DoacaoDTO, EstenderPrazoDTO } from "../model/campanha.dto";

@Injectable({
  providedIn: 'root'
})

export class CampanhaApi {
  private basePath = '/campanhas'; 
  constructor(private apiClient: ApiClientService) {}

  listarCampanhas(request: PagedRequest): Observable<PagedResponse<CampanhaMinDTO>> {
    return this.apiClient.getPaged<CampanhaMinDTO>(this.basePath, request);
  }

  listarCampanhasPorUsuario(usuarioId: number, request: PagedRequest): Observable<PagedResponse<CampanhaMinDTO>> {
    return this.apiClient.getPaged<CampanhaMinDTO>(`${this.basePath}/me/${usuarioId}`);
  }

  buscarPorId(campanhaId: number): Observable<CampanhaDTO> {
    return this.apiClient.get<CampanhaDTO>(`${this.basePath}/${campanhaId}`);
  }

  criarCampanha(request: CriarCampanhaDTO): Observable<CampanhaDTO> {
    return this.apiClient.post<CampanhaDTO>(this.basePath, request);
  }

  atualizarCampanha(campanhaId: number, request: CriarCampanhaDTO): Observable<CampanhaDTO> {
    return this.apiClient.put<CampanhaDTO>(`${this.basePath}/${campanhaId}`, request);
  }

  encerrarCampanha(campanhaId: number): Observable<CampanhaDTO> {
    return this.apiClient.patch<CampanhaDTO>(`${this.basePath}/${campanhaId}/encerrar`, null);
  }

  estenderPrazo(campanhaId: number, request: EstenderPrazoDTO): Observable<CampanhaDTO> {
    return this.apiClient.patch<CampanhaDTO>(`${this.basePath}/${campanhaId}/estender`, request);
  }

  registrarDoacao(campanhaId: number, request: DoacaoDTO): Observable<DoacaoDTO> {
    return this.apiClient.patch<DoacaoDTO>(`${this.basePath}/${campanhaId}/doar`, request);
  }
}