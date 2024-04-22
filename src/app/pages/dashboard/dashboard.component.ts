import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  cachorrosBuscados$: Observable<any>
  cachorrosAvistados$: Observable<any>

  constructor(
    private cachorroService: CachorroService,
  ){
    this.getCachorrosServidor()
  }

  getCachorrosServidor(){
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser('2')
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser('2')
  }

}
