import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RacaService } from '../../services/raca.service';
import { Raca } from '../../interfaces/raca.interface';
import { Observable, map } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';
import { Cachorro } from '../../interfaces/cachorro';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private cachorroService: CachorroService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo') || "perdido"

    this.cachorroForm = this.fb.group({
      nome: ['', Validators.required],
      raca: ['', Validators.required],
      genero: ['', Validators.required]
    });

    this.getRacasFromService()

  }

  getRacasFromService(){
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
        usuario: 1
      }
      this.createCachorro(cachorroObj)
    } else {
      console.log('Formulário inválido ou arquivo não selecionado');
    }
  }

  createCachorro(cachorroObj: Cachorro): void {
    this.cachorroService.createCachorro(cachorroObj, this.file).subscribe(
      (response) => {
        console.log('Resposta da requisição POST:', response);
        this.router.navigate(['/cadastro/cachorro']);
      },
      (error) => {
        console.error('Erro na requisição POST:', error);
      }
    );
  }

}
