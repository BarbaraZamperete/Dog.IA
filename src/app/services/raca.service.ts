import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map, throwError } from 'rxjs';
import { Raca } from '../interfaces/raca.interface';

@Injectable({
  providedIn: 'root'
})
export class RacaService {

  private apiUrl = '/api'

  constructor(private http: HttpClient) { }

  getRacas() {
    return this.http.get(`${this.apiUrl}/racas/`).pipe(map((response: any) => response as Raca[]), catchError((error: any) => {
      console.error('Erro na requisição getRacas:', error);
      return throwError(error);
    }))
  }
}
