import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { AtualizarPatrocinadorDTO, PatrocinadorDTO, PatrocinadorMinDTO } from "../model/patrocinador.dto";

@Injectable({
  providedIn: 'root'
})

export class PatrocinadorApi {
  private basePath = '/patrocinador'; 
  constructor(private apiClient: ApiClientService) {}

  listarPatrocinadores(): Observable<PatrocinadorMinDTO> {
    return this.apiClient.get<PatrocinadorMinDTO>(this.basePath);
  }

  buscarPorId(patrocinadorId: number): Observable<PatrocinadorMinDTO> {
    return this.apiClient.get<PatrocinadorMinDTO>(`${this.basePath}/${patrocinadorId}`);
  }

  buscarPerfil(): Observable<PatrocinadorDTO> {
    return this.apiClient.get<PatrocinadorDTO>(`${this.basePath}/me`);
  }

  atualizarPatrocinador(request: AtualizarPatrocinadorDTO): Observable<PatrocinadorDTO> {
    return this.apiClient.patch<PatrocinadorDTO>(`${this.basePath}/me`, request);
  }

  apagarPatrocinador(): Observable<void> {
    return this.apiClient.delete<void>(`${this.basePath}/me`);
  }
}