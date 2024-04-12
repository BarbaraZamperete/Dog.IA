import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Aqui você pode implementar a lógica para autenticar o usuário
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;
      console.log('Email:', email);
      console.log('Senha:', senha);

      // Após a autenticação bem-sucedida, você pode redirecionar para a próxima página
      this.router.navigate(['/']);
    } else {
      // Se o formulário não for válido, você pode adicionar lógica para lidar com isso, como exibir mensagens de erro
      console.log('Formulário inválido');
    }
  }
}
