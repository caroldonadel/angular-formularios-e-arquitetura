import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> { //httpresponse pra pegar dados do header de resposta
    return this.httpClient.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha
    },
    { observe: 'response'})//pra avisar o angular que estou interessada nao apenas do body da resposta mas tbm no header
    .pipe(
      tap((response) => {
        const authToken = response.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
      })
    )
  }
}
