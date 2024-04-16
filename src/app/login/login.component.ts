import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      // Chamando o método login do AuthService
      this.authService.login(email, senha).subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          // Redirecionando para a página principal após o login
          this.router.navigate(['/dashboard']);
        } else {
          // Exibir mensagem de erro de autenticação
          console.log('Email ou senha incorretos');
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
