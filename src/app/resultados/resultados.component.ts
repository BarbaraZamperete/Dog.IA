import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent {

  cachorros$ = [
    {id: 1, nome: "teste", imagem: [{caminho: ""}]}
  ]

  cachorroId: string | null = ''

  constructor(
    private routerActive: ActivatedRoute
  ){
    this.cachorroId = routerActive.snapshot.paramMap.get('id')
  }



  onContactar(id: number){

  }
}
