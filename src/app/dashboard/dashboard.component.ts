import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  cachorros = [
    {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
    {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
    {id: 123, nome: 'Guida', imagemUrl: '', texto: ''},
    {id: 123, nome: 'Guida', imagemUrl: '', texto: ''}
  ]

}
