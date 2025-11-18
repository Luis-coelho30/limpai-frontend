import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedRequest, PagedResponse } from "../model/paged.model";

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {
  private apiUrl = 'https://localhost:8080'; 

  constructor(private http: HttpClient) {}

  private toHttpParams(obj?: Record<string, any>, initial?: HttpParams): HttpParams {
    let params = initial ?? new HttpParams();
    if (!obj) return params;
    const flatten = (keyPrefix: string, value: any) => {

      if (value != null) {
        if (Array.isArray(value)) {
          value.forEach(v => { params = params.append(keyPrefix, String(v)); });
        } 
      
        else if (typeof value === 'object') {
          Object.keys(value).forEach(k => flatten(`${keyPrefix}.${k}`, value[k]));
        } 
      
        else {
          params = params.set(keyPrefix, String(value));
        }
      }
    };

    Object.keys(obj).forEach(k => {
      const v = obj[k];
      if (v === undefined || v === null) return;
      if (k === 'sort') {
        if (Array.isArray(v)) v.forEach(s => params = params.append('sort', String(s)));
        else params = params.set('sort', String(v));
      } else {
        flatten(k, v);
      }
    });

    return params;
  }
  
  request<T>(method: string, path: string, options: { params?: HttpParams; body?: any; headers?: HttpHeaders; withCookie?: boolean } = {}): Observable<T> {
    return this.http.request<T>(method, `${this.apiUrl}${path}`, {
      body: options.body,
      params: options.params,
      headers: options.headers,
      withCredentials: options.withCookie ?? false,
      responseType: 'json'
    });
  }

  getPaged<T>(path: string, req?: PagedRequest): Observable<PagedResponse<T>> {
    // Constroi os parametros HTTP Basicos de uma requisicao paginada (page, size, sort)
    const baseParams = this.toHttpParams({ page: req?.page, size: req?.size, sort: req?.sort });
    
    // Adiciona os filtros personalizados, se houver
    const allParams = this.toHttpParams(req?.filters, baseParams);

    return this.request<PagedResponse<T>>('GET', path, { params: allParams });
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', path, { params });
  }

  post<T>(path: string, body: any, withCookie = false): Observable<T> {
    return this.request<T>('POST', path, { body, withCookie });
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.request<T>('PUT', path, { body });
  }

  delete<T>(path: string): Observable<T> {
    return this.request<T>('DELETE', path);
  }
}