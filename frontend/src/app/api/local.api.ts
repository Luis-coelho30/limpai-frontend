import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { LocalRequest, LocalResponse } from "../model/local.dto";
import { PagedRequest, PagedResponse } from "../model/paged.model";

@Injectable({
  providedIn: 'root'
})

export class LocalApi {
  private basePath = '/local'; 
  constructor(private apiClient: ApiClientService) {}

  listarLocais(request: PagedRequest): Observable<PagedResponse<LocalResponse>> {
    return this.apiClient.getPaged<LocalResponse>(this.basePath, request);
  }

  buscarPorId(localId: number): Observable<LocalResponse> {
    return this.apiClient.get<LocalResponse>(`${this.basePath}/${localId}`);
  }

  criarLocal(request: LocalRequest): Observable<LocalResponse> {
    return this.apiClient.post<LocalResponse>(this.basePath, request);
  }

  atualizarLocal(localId: number, request: LocalRequest): Observable<LocalResponse> {
    return this.apiClient.put<LocalResponse>(`${this.basePath}/${localId}`, request);
  }
}