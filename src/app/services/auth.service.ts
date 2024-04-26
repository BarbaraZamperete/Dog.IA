import { AfterViewChecked, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private authTokenKey = 'authToken';
  private userIdKey = 'userId';
  private usernameKey = 'username';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    if (typeof sessionStorage !== 'undefined') {
      // Verifica se já existe um token armazenado no sessionStorage ao inicializar o serviço
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
        this.loggedIn.next(true);
      }
    }
  }

  login(username: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`http://localhost:8000/api-user-login/`, { username: username, password: senha }).pipe(
      map(response => {
        if (response && response.token) {
          sessionStorage.setItem(this.authTokenKey, response.token);
          sessionStorage.setItem(this.userIdKey, response.id);
          sessionStorage.setItem(this.usernameKey, response.username);
          this.loggedIn.next(true);
          return true;
        } else {
          this.loggedIn.next(false);
          return false;
        }
      })
    );
  }

  getToken(): string | null {
    try {
      return sessionStorage.getItem(this.authTokenKey); // Tenta recuperar o token do sessionStorage
    } catch (error) {
      console.error('Erro ao acessar o sessionStorage:', error);
      return null
    }

  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.usernameKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.usernameKey);
    this.loggedIn.next(false);
  }
}
