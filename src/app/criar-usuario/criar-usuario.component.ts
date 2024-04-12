import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.scss'
})
export class CriarUsuarioComponent {

  usuarioForm!: FormGroup;

  isEditable = false;
  constructor(private fb: FormBuilder, private router: Router) { }

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
      this.router.navigate(['/cadastro/cachorro']);
    } else {
      // Se o formulário não for válido, você pode adicionar lógica para lidar com isso, como exibir mensagens de erro
      console.log('Formulário inválido');
    }

  }
}
