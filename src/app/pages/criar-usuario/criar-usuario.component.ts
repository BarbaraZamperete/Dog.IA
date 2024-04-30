import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.scss'
})
export class CriarUsuarioComponent {

  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private snackBar: MatSnackBar
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
      if (this.usuarioForm.controls['senha'].value == this.usuarioForm.controls['confirmarSenha'].value) {
        const usuarioData: Usuario = {
          first_name: this.usuarioForm.value.nomeTutor,
          password: this.usuarioForm.value.senha,
          telefone: this.usuarioForm.value.telefone,
          username: this.usuarioForm.value.username
        };
        this.usuarioService.insertUser(usuarioData).subscribe(response => {
          this.authService.setCredentials(response.token, response.username, response.user_id)
          let param: NavigationExtras = {
            queryParams: { id: response.id }
          };
          this.openSnackBar("Usuário criado com sucesso", "success")
          this.router.navigate(['/cadastro/cachorro/buscado'],param);
        }, error => {
          this.openSnackBar("Erro no servidor ao criar usuário", "error")
        })
      } else {
        this.openSnackBar("As senhas não são iguais", "error")
      }

    } else {
      this.openSnackBar("Formulário inválido", "error")
    }

  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }
}
