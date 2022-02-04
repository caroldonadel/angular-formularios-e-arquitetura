import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({}); //Toda vez que algum componente,
  //algum outro serviço faz um subscribe nesse observable, esse BehaviorSubject envia o último dado que estava nele

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable(); //enviar como observable e nao como subject para nao sei possivel alterar meu estado de fora deste serviço
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }
}
