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
  cachorroPesquisado: any

  constructor(
    private routerActive: ActivatedRoute,
    private cachorroService: CachorroService
  ) {
    this.cachorroId = routerActive.snapshot.paramMap.get('id') || '0'
    this.getCachorro()
  }

  getCachorro() {
    this.cachorroService.getCachorroById(this.cachorroId).subscribe(
      (cachorro: any) => {
        this.cachorroPesquisado = cachorro
        this.cachorroIdTipo = cachorro.tipo
        this.cachorroIdTipo == 1?this.getResultsByBuscado() : this.getResultsByAvistado()
      }
    )
  }

  getResultsByBuscado() {
    this.combinacoes$ = this.cachorroService.getResultsByBuscado(this.cachorroId)
  }

  getResultsByAvistado(){
    this.combinacoes$ = this.cachorroService.getResultsByAvistado(this.cachorroId)
  }

}
