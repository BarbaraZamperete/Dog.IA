import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cachorro } from '../interfaces/cachorro';
import { catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachorroService {

  private apiUrl = '/api'

  constructor(private http: HttpClient) { }

  createCachorro(cachorroData: Cachorro, imagem: File) {
    return this.http.post(`${this.apiUrl}/cachorros/adicionar/`, cachorroData).pipe(
      switchMap((cachorro: any) => {
        console.log(cachorro);
        const imagemObj = new FormData()
        imagemObj.append('cachorro', cachorro.id)
        imagemObj.append('caminho', imagem)
        return this.http.post(`${this.apiUrl}/imagens/adicionar/`, imagemObj).pipe(
          catchError((error: any) => {
            console.error('Erro na requisição postImagem:', error);
            return throwError(error);
          })
        );
      }),
      catchError((error: any) => {
        console.error('Erro na requisição postCachorro:', error);
        return throwError(error);
      })
    );
  }


  getCachorrosBuscadosByUser(usuario_id: number) {
    return this.http.get(`${this.apiUrl}/cachorros/buscados`)
      .pipe(
        // map((response: any) => {
        //   // response as Cachorro[]
        //   response.filter((cachorro: any) => cachorro.usuario == usuario_id)
        // }),
        catchError((error: any) => {
          console.error('Erro na requisição getCachorros:', error);
          return throwError(error);
        }))
  }

  getCachorrosAvistadosByUser(usuario_id: number) {
    return this.http.get(`${this.apiUrl}/cachorros/avistados`)
      .pipe(
        // map((response: any) => {
        //   // response as Cachorro[]
        //   response.filter((cachorro: any) => cachorro.usuario == usuario_id)
        // }),
        catchError((error: any) => {
          console.error('Erro na requisição getCachorros:', error);
          return throwError(error);
        }))
  }
}
