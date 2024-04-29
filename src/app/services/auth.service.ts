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
    // if (typeof sessionStorage !== 'undefined') {
    //   // Verifica se já existe um token armazenado no sessionStorage ao inicializar o serviço
    //   const storedToken = sessionStorage.getItem('token');
    //   if (storedToken) {
    //     this.token = storedToken;
    //     this.loggedIn.next(true);
    //   }
    // }

    this.checkLoginStatus()
  }

  login(username: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`http://localhost:8000/api-user-login/`, { username: username, password: senha }).pipe(
      map(response => {
        if (response && response.token) {
          this.setCredentials(response.token, response.username, response.id)
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

  setCredentials(token: string, username: string, id: string) {
    sessionStorage.setItem(this.authTokenKey, token);
    sessionStorage.setItem(this.userIdKey, id);
    sessionStorage.setItem(this.usernameKey, username);
  }

  getUserId(): string | null {
    this.checkLoginStatus()
    return sessionStorage.getItem(this.userIdKey);
  }

  getUsername(): string | null {
    this.checkLoginStatus()
    return sessionStorage.getItem(this.usernameKey);
  }

  isLoggedIn(): boolean {
    this.checkLoginStatus()
    return this.loggedIn.getValue();
  }

  checkLoginStatus() {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (token && userId) {
        // Verificar se o token e o userId são válidos na API
        this.http.post<any>('http://localhost:8000/api-token-verify/', { token, userId })
          .subscribe(response => {
            if (response.valid) {
              this.loggedIn.next(true); // Definir como logado se a verificação for bem-sucedida
            } else {
              // Limpar sessionStorage e definir como não logado se a verificação falhar
              sessionStorage.removeItem(this.authTokenKey);
              sessionStorage.removeItem(this.userIdKey);
              sessionStorage.removeItem(this.usernameKey);
              this.loggedIn.next(false);
            }
          }, error => {
            console.error('Erro ao verificar token:', error);
          });
      }
    }catch(error){
      console.error('Erro ao acessar o sessionStorage:', error);
    }



  }

  logout(): void {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.usernameKey);
    this.loggedIn.next(false);
  }
}
