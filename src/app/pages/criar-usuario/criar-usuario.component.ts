import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.scss'
})
export class CriarUsuarioComponent {

  usuarioForm!: FormGroup;

  isEditable = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nomeTutor: ['', Validators.required],
      username: ['', [Validators.required]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      console.log(this.usuarioForm.value);
      if (this.usuarioForm.controls['senha'].value == this.usuarioForm.controls['confirmarSenha'].value) {
        const usuarioData: Usuario = {
          first_name: this.usuarioForm.value.nomeTutor,
          password: this.usuarioForm.value.senha,
          telefone: this.usuarioForm.value.telefone,
          username: this.usuarioForm.value.username
        };
        let user
        this.usuarioService.insertUser(usuarioData).subscribe(response => {
          console.log('Resposta da requisição POST:', response);
          this.authService.setCredentials(response.token, response.username, response.id)
          this.router.navigate(['/cadastro/cachorro/buscado']);
        }, error => {
          console.error('Erro na requisição POST:', error);
        })
      } else {
        console.log('As senhas não são iguais');
      }

    } else {
      console.log('Formulário inválido');
    }

  }
}
