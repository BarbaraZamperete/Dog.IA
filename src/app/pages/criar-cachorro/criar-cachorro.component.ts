import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cachorro } from '../../interfaces/cachorro';
import { Raca } from '../../interfaces/raca.interface';
import { CachorroService } from '../../services/cachorro.service';
import { RacaService } from '../../services/raca.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private cachorroService: CachorroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo') || "buscado"

  }

  ngOnInit() {

    this.cachorroForm = this.fb.group({
      nome: [this.tipo === 'buscado' ? '' : null, this.tipo === 'buscado' ? Validators.required : null],
      raca: ['', Validators.required],
      genero: ['', Validators.required],
      descricao: ['', this.tipo === 'avistado' ? Validators.required : null]
    });

    this.getRacasFromService()

  }

  getRacasFromService() {
    this.racas$ = this.racaService.getRacas()
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

    if (this.cachorroForm.valid && this.file) {
      const cachorroObj = {
        nome: this.cachorroForm.get('nome')?.value || '',
        raca: +this.cachorroForm.get('raca')?.value || 1,
        genero: +this.cachorroForm.get('genero')?.value || 1,
        usuario: this.tipo == 'avistado' ? 1 : this.usuario,
        tipo: this.tipo == 'buscado' ? 1 : 2,
        descricao: this.cachorroForm.get('descricao')?.value || ''
      }

      if (this.tipo === 'buscado') {
        const id = this.auth.getUserId();
        this.usuario = id ? parseInt(id, 10) : 1
        if (id) {
          this.createCachorro(cachorroObj)
        }else{
          this.router.navigate(['/login']);
        }
      }else{
        this.createCachorro(cachorroObj)
      }

    } else {
      console.log('Formulário inválido ou arquivo não selecionado');
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
        this.tipo == 'buscado' ? this.router.navigate(['/dashboard'], param) : this.router.navigate([`/resultados/${id}`]);
      },
      (error) => {
        console.error('Erro na requisição POST:', error);
      },
      () => {
        this.loading = false; // Define o estado de carregamento como false após a requisição
      }
    );
  }

}
