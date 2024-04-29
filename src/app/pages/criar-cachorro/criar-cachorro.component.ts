import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RacaService } from '../../services/raca.service';
import { Raca } from '../../interfaces/raca.interface';
import { Observable, map } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';
import { Cachorro } from '../../interfaces/cachorro';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-criar-cachorro',
  templateUrl: './criar-cachorro.component.html',
  styleUrl: './criar-cachorro.component.scss'
})
export class CriarCachorroComponent {

  // racas = [
  //   {nome: 'Sem raça definida - SRD', id: 1},
  //   {nome: 'Poodle', id: 2},
  //   {nome: 'Pitbul', id: 3}
  // ]

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
    private sessionStorageService: SessionStorageService
  ) {
  }

  async ngOnInit() {

    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo') || "buscado"

    if (this.tipo === 'buscado') {
      const id = await this.sessionStorageService.getUserId();
      this.usuario = id ? parseInt(id, 10) : 1
      if (id === null) {
        this.router.navigate(['/login']);
      }
    }

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
      this.createCachorro(cachorroObj)
    } else {
      console.log('Formulário inválido ou arquivo não selecionado');
    }
  }

  createCachorro(cachorroObj: Cachorro): void {
    this.loading = true
    this.cachorroService.createCachorro(cachorroObj, this.file).subscribe(
      (response: any) => {
        console.log('Resposta da requisição POST:', response);
        const id = response.cachorro
        this.tipo == 'buscado' ? this.router.navigate(['/dashboard']) : this.router.navigate([`/resultados/${id}`]);
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
