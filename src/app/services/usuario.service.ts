import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api-user/usuarios'

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

}
