import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.scss'
})
export class CriarUsuarioComponent {

  usuarioForm!: FormGroup;

  isEditable = false;
  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nomeTutor: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      // Aqui você pode implementar a lógica para enviar os dados do formulário para o servidor
      console.log(this.usuarioForm.value);
      if (this.usuarioForm.controls['senha'].value == this.usuarioForm.controls['confirmarSenha'].value) {
        const usuarioData: Usuario = {
          nome: this.usuarioForm.value.nomeTutor,
          password: this.usuarioForm.value.senha,
          telefone: this.usuarioForm.value.telefone,
          email: this.usuarioForm.value.email
        };
        let user
        this.usuarioService.insertUser(usuarioData).subscribe(response => {
          console.log('Resposta da requisição POST:', response);
          user = response
          this.router.navigate(['/cadastro/cachorro']);
        }, error => {
          console.error('Erro na requisição POST:', error);
        })
      } else {
        console.log('As senhas não são iguais');
      }

    } else {
      // Se o formulário não for válido, você pode adicionar lógica para lidar com isso, como exibir mensagens de erro
      console.log('Formulário inválido');
    }

  }
}
