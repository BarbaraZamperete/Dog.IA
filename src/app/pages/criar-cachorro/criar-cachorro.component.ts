import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Cachorro } from '../../interfaces/cachorro';
import { Raca } from '../../interfaces/raca.interface';
import { CachorroService } from '../../services/cachorro.service';
import { RacaService } from '../../services/raca.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-criar-cachorro',
  templateUrl: './criar-cachorro.component.html',
  styleUrl: './criar-cachorro.component.scss'
})
export class CriarCachorroComponent {

  cachorroForm!: FormGroup;
  selectedFileName: string | null = null;
  file: File
  racas$: Observable<Raca[]>;
  tipo: string
  usuario: number = 1
  loading: boolean = false;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private cachorroService: CachorroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo') || "buscado"

  }

  ngOnInit() {

    this.cachorroForm = this.fb.group({
      nome: ['', Validators.required],
      // raca: ['', Validators.required],
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.selectedFileName = null;
    }
  }
  removeImage() {
    this.selectedFileName = '';
    this.imagePreview = '';
  }

  onSubmit() {
    const id = this.auth.getUserId();
    this.usuario = id ? parseInt(id, 10) : 1

    if (this.cachorroForm.valid && this.file) {
      const cachorroObj = {
        nome: this.cachorroForm.get('nome')?.value || '',
        // raca: 0,
        // raca_certeza: 0,
        genero: +this.cachorroForm.get('genero')?.value || 1,
        usuario: this.usuario,
        tipo: 1,
        descricao: this.cachorroForm.get('descricao')?.value || ''
      }

      if (id) {
        this.createCachorro(cachorroObj)
      } else {
        this.router.navigate(['/login']);
        this.openSnackBar("Faça o login para adicionar um cachorro perdido", "error")
      }

    } else {
      this.openSnackBar("Formulário inválido ou arquivo não selecionado", "warn")
    }
  }

  createCachorro(cachorroObj: Cachorro): void {
    this.loading = true
    this.cachorroService.createCachorro(cachorroObj, this.file).subscribe(
      (response: any) => {
        const id = response.cachorro
        let param: NavigationExtras = {
          queryParams: { id: this.usuario }
        };
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
