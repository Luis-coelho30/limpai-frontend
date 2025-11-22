import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError, filter, take, finalize } from 'rxjs/operators';
import { AuthApi } from '../api/auth.api';
import {
	LoginRequest,
	LoginResponse,
	RegisterVoluntarioRequest,
	RegisterPatrocinadorRequest
} from '../model/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly STORAGE_KEY = 'access_token';
	private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.STORAGE_KEY));
	public token$ = this.tokenSubject.asObservable();
	public isAuthenticated$ = this.token$.pipe(map(t => !!t));

	private refreshInProgress = false;
	private refreshSubject = new BehaviorSubject<string | null>(null);

	constructor(private authApi: AuthApi) { }

	login(payload: LoginRequest): Observable<LoginResponse> {
		return this.authApi.login(payload).pipe(
			tap(res => {
				const token = res.token;
				if (token) this.setToken(token);
			})
		);
	}

	setToken(token: string | null) {
		if (token) {
			localStorage.setItem(this.STORAGE_KEY, token);
			this.tokenSubject.next(token);
		} else {
			localStorage.removeItem(this.STORAGE_KEY);
			this.tokenSubject.next(null);
		}
	}

	getToken(): string | null {
		return this.tokenSubject.value;
	}

	refreshToken(): Observable<string> {
		if (this.refreshInProgress) {
			return this.refreshSubject.pipe(
				filter(t => t !== null),
				take(1),
				map(t => t as string)
			);
		}

		this.refreshInProgress = true;
		this.refreshSubject.next(null);

		return this.authApi.refresh().pipe(
			map(res => res.token),
			tap(token => {
				if (token) this.setToken(token);
				this.refreshSubject.next(token);
			}),
			catchError(err => {
				this.setToken(null);
				return throwError(() => err);
			}),
			finalize(() => {
				this.refreshInProgress = false;
			})
		);
	}

	logout(): void {
		this.setToken(null);
		this.authApi.logout().subscribe({ next: () => { }, error: () => { } });
	}

	cadastrarVoluntario(payload: RegisterVoluntarioRequest): Observable<LoginResponse> {
		return this.authApi.cadastrarVoluntario(payload).pipe(
			tap(res => {
				const token = res.token;
				if (token) this.setToken(token);
			})
		);
	}

	cadastrarPatrocinador(payload: RegisterPatrocinadorRequest): Observable<LoginResponse> {
		return this.authApi.cadastrarPatrocinador(payload).pipe(
			tap(res => {
				const token = res.token;
				if (token) this.setToken(token);
			})
		);
	}
}