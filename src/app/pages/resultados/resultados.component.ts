import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent {

  cachorroId: string = '0'
  cachorroIdTipo: number = 1
  combinacoes$: Observable<any>

  constructor(
    private routerActive: ActivatedRoute,
    private cachorroService: CachorroService
  ){
    this.cachorroId = routerActive.snapshot.paramMap.get('id') || '0'
    this.getResultsByBuscado()
  }

  getResultsByBuscado(){
    this.combinacoes$ = this.cachorroService.getResultsByBuscado(this.cachorroId)
  }

}
