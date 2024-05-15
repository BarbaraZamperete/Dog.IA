import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, throwError, catchError, map } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://34.28.233.41:8000/api-user/usuarios'

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/retornar_usuario/${id}`).pipe(first())
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios_list/`).pipe(first())
  }

  insertUser(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/`, usuario)
  }

  insertUserAvistado(user: any) {
    return this.http.post<any>('/api/usuario/adicionar', user).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição criar usuário avistado:', error);
        return throwError(error);
      })
    );
  }

}
