import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCachorroById(id: string) {
    return this.http.get(`${this.apiUrl}/cachorros/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição getCachorro:', error);
        return throwError(error);
      })
    );
  }


  getCachorrosBuscadosByUser(usuario_id: string = '') {
    if (usuario_id == '') {
      return this.http.get(`${this.apiUrl}/cachorros/buscados`)
        .pipe(
          catchError((error: any) => {
            console.error('Erro na requisição getCachorros:', error);
            return throwError(error);
          }))
    }
    let params = new HttpParams()
    params = params.append('usuario', usuario_id)
    return this.http.get(`${this.apiUrl}/cachorros/buscados`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Erro na requisição getCachorros:', error);
          return throwError(error);
        }))
  }

  getCachorrosAvistadosByUser(usuario_id: string = '') {

    if (usuario_id == '') {
      return this.http.get(`${this.apiUrl}/cachorros/avistados`)
        .pipe(
          catchError((error: any) => {
            console.error('Erro na requisição getCachorros:', error);
            return throwError(error);
          }))
    }

    let params = new HttpParams()
    params = params.append('usuario', usuario_id)
    return this.http.get(`${this.apiUrl}/cachorros/avistados`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Erro na requisição getCachorros:', error);
          return throwError(error);
        }))
  }

  changeStatus(id: number, status: boolean) {

    return this.http.patch(`${this.apiUrl}/cachorros/${id}/`, { status: status }).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição postCachorro:', error);
        return throwError(error);
      })
    )
  }

  generateResults(id: string) {
    let post = new FormData()
    post.append('id_cachorro', id)
    return this.http.post(`${this.apiUrl}/combinacoes/adicionar`, post).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição postCachorro:', error);
        return throwError(error);
      })
    )
  }

  getResultsByBuscado(id: string) {
    return this.http.get(`${this.apiUrl}/combinacoes/buscado/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição getCachorro:', error);
        return throwError(error);
      })
    );
  }

  getResultsByAvistado(id: string) {
    return this.http.get(`${this.apiUrl}/combinacoes/avistado/${id}`).pipe(
      // map(res=> console.log(res)),
      catchError((error: any) => {
        console.error('Erro na requisição getCachorro:', error);
        return throwError(error);
      })
    );
  }


}
