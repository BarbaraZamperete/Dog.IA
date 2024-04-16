import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(email: string, senha: string): Observable<boolean> {
    // Implemente aqui a lógica para autenticar o usuário (pode ser uma chamada HTTP para o backend)
    // Aqui estamos simulando uma autenticação bem-sucedida com um email e senha específicos
    if (email === 'barbara@gmail.com' && senha === '123456') {
      this.loggedIn.next(true);
      return this.loggedIn.asObservable();
    } else {
      this.loggedIn.next(false);
      return this.loggedIn.asObservable();
    }
  }

  logout(): void {
    // Limpe o estado de autenticação e redirecione para a página de login
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}
