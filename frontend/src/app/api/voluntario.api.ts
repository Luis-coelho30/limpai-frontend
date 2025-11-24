import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { AtualizarVoluntarioDTO, VoluntarioDTO, VoluntarioMinDTO } from "../model/voluntario.dto";

@Injectable({
  providedIn: 'root'
})

export class VoluntarioApi {
  private basePath = '/voluntario'; 
  constructor(private apiClient: ApiClientService) {}

  listarVoluntarios(): Observable<VoluntarioMinDTO> {
    return this.apiClient.get<VoluntarioMinDTO>(this.basePath);
  }

  buscarPorId(voluntarioId: number): Observable<VoluntarioMinDTO> {
    return this.apiClient.get<VoluntarioMinDTO>(`${this.basePath}/${voluntarioId}`);
  }

  buscarPerfil(): Observable<VoluntarioDTO> {
    return this.apiClient.get<VoluntarioDTO>(`${this.basePath}/me`);
  }

  atualizarVoluntario(request: AtualizarVoluntarioDTO): Observable<VoluntarioDTO> {
    return this.apiClient.patch<VoluntarioDTO>(`${this.basePath}/me`, request);
  }

  apagarVoluntario(): Observable<void> {
    return this.apiClient.delete<void>(`${this.basePath}/me`);
  }
}