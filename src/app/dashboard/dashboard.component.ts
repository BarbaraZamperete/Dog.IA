import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CachorroService } from '../services/cachorro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // cachorros = [
  //   {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
  //   {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
  //   {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
  //   {id: 123, nome: 'Guida', imagemUrl: '', texto: ''}
  // ]

  cachorrosBuscados$: Observable<any>
  cachorrosAvistados$: Observable<any>

  constructor(
    private cachorroService: CachorroService,
    private router: Router
  ){
    this.getCachorrosServidor()
  }

  getCachorrosServidor(){
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser(1)
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser(1)
  }

  verResultados(id: number){
    this.router.navigate(['resultados', id])
  }

}
