/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserInterface } from '../../interfaces/user.interface';

// TODO: Criptografar autenticação (token)
// TODO: Criptografar senha

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  logar(usuario: UserInterface): Observable<any> {
    /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
    tap((resposta) => {
    if(!resposta.sucesso) return;
    localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
    localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
    this.router.navigate(['']);
    }));*/
    return this.mockUsuarioLogin(usuario).pipe(
      tap((resposta) => {
        if (!resposta.sucesso) return;
        localStorage.setItem(
          'token',
          btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI'))
        );
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['home']);
      })
    );
  }

  private mockUsuarioLogin(usuario: UserInterface): Observable<any> {
    const retornoMock: any = [];
    if (usuario.email === 'hello@teste.com' && usuario.pass == '1234') {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = 'TokenQueSeriaGeradoPelaAPI';
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): string {
    return JSON.stringify(localStorage.getItem('usuario'));
  }

  get obterIdUsuarioLogado(): string {
    return JSON.stringify(localStorage.getItem('usuario'));
  }

  get obterTokenUsuario(): string {
    return JSON.stringify(localStorage.getItem('token'));
  }

  get authenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
