import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RacaService } from '../services/raca.service';
import { Raca } from '../interfaces/raca.interface';
import { Observable, map } from 'rxjs';
import { response } from 'express';

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
  racas$: Observable<Raca[]>;

  constructor(private fb: FormBuilder, private racaService: RacaService) {
  }

  ngOnInit(): void {

    this.cachorroForm = this.fb.group({
      nomeCachorro: ['', Validators.required],
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
      const file: File = input.files[0];
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = null;
    }
  }

  onSubmit() {
    if (this.cachorroForm.valid && this.selectedFileName) {
      const formData = new FormData();
      formData.append('imagem', this.selectedFileName);
    } else {
      console.log('Formulário inválido ou arquivo não selecionado');
    }
  }

}
