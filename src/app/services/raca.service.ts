import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map, throwError } from 'rxjs';
import { Raca } from '../interfaces/raca.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RacaService {

  private apiUrl = 'http://34.28.233.41:8000/api'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRacas() {
    return this.http.get(`${this.apiUrl}/racas/`).pipe(
      map((response: any) => response as Raca[])
    );
  }
}
