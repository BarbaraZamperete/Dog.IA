import { AfterViewChecked, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private authTokenKey = 'authToken';
  private userIdKey = 'userId';
  private usernameKey = 'username';
  private token: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {

    // this.checkLoginStatus()
  }

  login(username: string, senha: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api-user-login/`, { username: username, password: senha }).pipe(
      map(response => {
        if (response && response.token) {
          this.setCredentials(response.token, response.username, response.id)
          this.loggedIn.next(true);
          return {id: response.id, loging: true};
        } else {
          this.loggedIn.next(false);
          return {id: '', loging: false};
        }
      })
    );
  }

  getToken(): string | null {
    try {
      return this.cookieService.get(this.authTokenKey); // Tenta recuperar o token do sessionStorage
    } catch (error) {
      console.error('Erro ao acessar o sessionStorage:', error);
      return null
    }

  }

  setCredentials(token: string, username: string, id: string) {
    this.logout()
    this.cookieService.set(this.authTokenKey, token); // Salva o token no cookie
    this.cookieService.set(this.userIdKey, id); // Salva o ID do usuário no cookie
    this.cookieService.set(this.usernameKey, username); // Salva o nome de usuário no cookie
  }

  getUserId(): string | null {
    return this.cookieService.get(this.userIdKey); // Recupera o ID do usuário do cookie
  }

  getUsername(): string | null {
    return this.cookieService.get(this.usernameKey); // Recupera o nome de usuário do cookie
  }

  isLoggedIn(): boolean {
    // this.checkLoginStatus()
    return this.loggedIn.getValue();
  }

  // checkLoginStatus() {
  //   try {
  //     const token = this.cookieService.get(this.authTokenKey);
  //     const userId = this.cookieService.get(this.userIdKey);
  //     console.log(token, userId)
  //     if (token && userId) {
  //       // Verificar se o token e o userId são válidos na API
  //       this.http.post<any>('http://localhost:8000/api-token-verify/', { token, userId })
  //         .subscribe(response => {
  //           if (response.valid) {
  //             this.loggedIn.next(true); // Definir como logado se a verificação for bem-sucedida
  //           } else {
  //             // Limpar sessionStorage e definir como não logado se a verificação falhar
  //             this.logout()
  //             this.loggedIn.next(false);
  //           }
  //         }, error => {
  //           console.error('Erro ao verificar token:', error);
  //         });
  //     }
  //   } catch (error) {
  //     console.error('Erro ao acessar os Cookies:', error);
  //   }

  // }


  logout(): void {
    this.cookieService.delete(this.authTokenKey); // Remove o token do cookie
    this.cookieService.delete(this.userIdKey); // Remove o ID do usuário do cookie
    this.cookieService.delete(this.usernameKey); // Remove o nome de usuário do cookie
    this.loggedIn.next(false);
  }

}
