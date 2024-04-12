import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api/'

  constructor(private http: HttpClient) { }

  getUserById(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`)
  }
}
