import { Component } from '@angular/core';
import { CachorroService } from '../../services/cachorro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cachorros',
  templateUrl: './cachorros.component.html',
  styleUrl: './cachorros.component.scss'
})
export class CachorrosComponent {

  cachorrosBuscados$: Observable<any>
  cachorrosAvistados$: Observable<any>

  constructor(private cachorroService: CachorroService){

    this.getCachorros()

  }

  getCachorros(){
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser()
    // this.cachorroService.getCachorrosBuscadosByUser().forEach(res => console.log(res))
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser()
    // this.cachorroService.getCachorrosAvistadosByUser().forEach(res => console.log(res))
  }

}
