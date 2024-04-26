import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

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
      this.authService.login(username, senha).subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          // Redirecionando para a página principal após o login
          this.router.navigate(['/dashboard']);
          console.log(loggedIn)
        } else {
          // Exibir mensagem de erro de autenticação
          console.log('Usuário ou senha incorretos');
        }
      });
    } else {
      console.log('Formulário inválido');
    }
    // this.router.navigate(['/dashboard'])
  }
}
