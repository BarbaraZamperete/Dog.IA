import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const senha = this.loginForm.value.senha;

      // Chamando o método login do AuthService
      this.authService.login(username, senha).subscribe((loggedIn: any) => {
        if (loggedIn.loging) {
          // Redirecionando para a página principal após o login
          let param: NavigationExtras = {
            queryParams: { id: loggedIn.id }
          };
          this.router.navigate(['/dashboard'], param);
        } else {
          // Exibir mensagem de erro de autenticação
          this.openSnackBar("Usuário ou senha incorretos", "error")
        }
      });
    } else {
      this.openSnackBar("Formulário inválido", "info")
    }
  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }
}
