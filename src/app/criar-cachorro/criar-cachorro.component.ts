import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-cachorro',
  templateUrl: './criar-cachorro.component.html',
  styleUrl: './criar-cachorro.component.scss'
})
export class CriarCachorroComponent {

  racas = [
    {nome: 'Sem raça definida - SRD', id: 1},
    {nome: 'Poodle', id: 2},
    {nome: 'Pitbul', id: 3}
  ]

  cachorroForm!: FormGroup;
  selectedFileName: string | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cachorroForm = this.fb.group({
      nomeCachorro: ['', Validators.required],
      raca: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  onFileSelected(input: HTMLInputElement | null) {
    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.selectedFileName = file.name;
      // Faça outras operações com o arquivo, se necessário
    } else {
      this.selectedFileName = null;
    }
  }

  onSubmit() {
    if (this.cachorroForm.valid && this.selectedFileName) {
      const formData = new FormData();
      formData.append('imagem', this.selectedFileName);
      // Adicione outras informações do formulário ao formData conforme necessário
      console.log(formData);
      // Aqui você pode enviar o formData para o servidor
    } else {
      console.log('Formulário inválido ou arquivo não selecionado');
    }
  }

}
