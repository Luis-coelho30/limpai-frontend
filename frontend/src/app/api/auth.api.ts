import { Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { LoginRequest, LoginResponse, RegisterPatrocinadorRequest, RegisterVoluntarioRequest } from "../model/auth.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthApi {
  private basePath = '/auth'; 
  constructor(private apiClient: ApiClientService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse>(`${this.basePath}/login`, request, true);
  }

  logout(): Observable<void> {
    return this.apiClient.post<void>(`${this.basePath}/logout`, null, true);
  }

  refresh(): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse>(`${this.basePath}/refresh`, null, true);
  }

  cadastrarVoluntario(request: RegisterVoluntarioRequest): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse>(`${this.basePath}/cadastrar/voluntario`, request, false);
  }

  cadastrarPatrocinador(request: RegisterPatrocinadorRequest): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse>(`${this.basePath}/cadastrar/patrocinador`, request, false);
  }

  mudarSenha(senhaAtual: string, senhaNova: string): Observable<LoginResponse> {
    return this.apiClient.put<LoginResponse>(`${this.basePath}/alterar-senha`, { senhaAtual, senhaNova });
  }

  mudarEmail(novoEmail: string, senhaAtual: string): Observable<LoginResponse> {
    return this.apiClient.put<LoginResponse>(`${this.basePath}/alterar-email`, { novoEmail, senhaAtual });
  }
}