import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  @Output() eventoContato = new EventEmitter<any>()

  constructor(
    private routerActive: ActivatedRoute
  ){
    this.cachorroId = routerActive.snapshot.paramMap.get('id')
  }

}
