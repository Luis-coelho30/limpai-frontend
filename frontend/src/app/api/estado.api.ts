import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { Observable } from "rxjs";
import { EstadoResponse } from "../model/estado.dto";

@Injectable({
  providedIn: 'root'
})
export class EstadoApi {
  private basePath = '/estados'; 
  constructor(private apiClient: ApiClientService) {}

  listarEstados(): Observable<EstadoResponse[]> {
    return this.apiClient.get<EstadoResponse[]>(this.basePath);
  }
}