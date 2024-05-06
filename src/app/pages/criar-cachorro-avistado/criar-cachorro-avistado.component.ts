import { Component } from '@angular/core';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Raca } from '../../interfaces/raca.interface';
import { RacaService } from '../../services/raca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cachorro } from '../../interfaces/cachorro';
import { AuthService } from '../../services/auth.service';
import { CachorroService } from '../../services/cachorro.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-criar-cachorro-avistado',
  templateUrl: './criar-cachorro-avistado.component.html',
  styleUrl: './criar-cachorro-avistado.component.scss'
})
export class CriarCachorroAvistadoComponent {

  cachorroForm!: FormGroup;
  selectedFileName: string | null = null;
  file: File
  racas$: Observable<Raca[]>;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private usuarioService: UsuarioService,
    private cachorroService: CachorroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {

    this.cachorroForm = this.fb.group({
      raca: ['', Validators.required],
      contato: ['', Validators.required],
      nome: [''],
      genero: ['', Validators.required],
      descricao: ['']
    });

    this.getRacasFromService()

  }

  getRacasFromService() {
    this.racas$ = this.racaService.getRacas().pipe(
      catchError((error: any) => {
        this.openSnackBar("Erro ao carregar raças", "error")
        return throwError(error);
      }))
  }

  onFileSelected(input: HTMLInputElement | null) {
    if (input && input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.selectedFileName = this.file.name;
    } else {
      this.selectedFileName = null;
    }
  }

  onSubmit() {
    const id = this.auth.getUserId();

    if (this.cachorroForm.valid && this.file) {
      const userObj = { nome: this.cachorroForm.get('nome')?.value, telefone: this.cachorroForm.get('contato')?.value }
      this.usuarioService.insertUserAvistado(userObj).subscribe(
        (res) => {
          console.log('Resposta:', res);
          const cachorroObj = {
            nome: '',
            raca: +this.cachorroForm.get('raca')?.value || 1,
            genero: +this.cachorroForm.get('genero')?.value || 1,
            usuario_avista: res.id,
            usuario: null,
            tipo: 2,
            descricao: this.cachorroForm.get('descricao')?.value || ''
          }
          this.createCachorro(cachorroObj)
        },
        (error) => {
          this.openSnackBar("Erro ao cadastrar usuário do cachorro avistado", "info")
        }
      );
    } else {
      this.openSnackBar("Formulário inválido ou arquivo não selecionado", "info")
    }
  };

  createCachorro(cachorroObj: any): void {
    this.loading = true
    this.cachorroService.createCachorro(cachorroObj, this.file).subscribe(
      (response: any) => {
        const id = response.cachorro
        this.openSnackBar("Cachorro adicionado com sucesso", "success")
        this.router.navigate([`/resultados/${id}`]);
      },
      (error) => {
        this.openSnackBar("Erro no servidor ao criar cachorro", "warn")
      },
      () => {
        this.loading = false; // Define o estado de carregamento como false após a requisição
      }
    );
  }


  openSnackBar(mesage: string, tipo: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: mesage, tipo: tipo },
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }
}
