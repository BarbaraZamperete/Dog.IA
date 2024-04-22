import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CachorroService } from '../../services/cachorro.service';
import { Observable } from 'rxjs';

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
    // this.generateResults()
    this.getResultsByBuscado()
  }

  generateResults(){
    console.log(this.cachorroId)
    this.cachorroService.generateResults(this.cachorroId).subscribe(re => console.log(re))
  }

  getResultsByBuscado(){
    this.combinacoes$ = this.cachorroService.getResultsByBuscado(this.cachorroId)
  }

}
