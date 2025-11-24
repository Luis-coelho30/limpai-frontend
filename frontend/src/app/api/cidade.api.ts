import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { CidadeResponse } from "../model/cidade.dto";

@Injectable({
  providedIn: 'root'
})

export class CidadeApi {
  private basePath = '/cidades'; 
  constructor(private apiClient: ApiClientService) {}

  buscarPorNome(cidadeNome: string): Observable<CidadeResponse[]> {
    return this.apiClient.get<CidadeResponse[]>(`${this.basePath}/${cidadeNome}`);
  }

  listarCidadesPorEstado(estadoId: number): Observable<CidadeResponse[]> {
    return this.apiClient.get<CidadeResponse[]>(`${this.basePath}/estado/${estadoId}`);
  }
}