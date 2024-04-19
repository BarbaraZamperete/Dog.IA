import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cachorro',
  templateUrl: './card-cachorro.component.html',
  styleUrl: './card-cachorro.component.scss'
})
export class CardCachorroComponent {

    @Input() cachorros: any[]
    @Input() acao: string
    @Input() botaoNome: string

  constructor(    private router: Router) { }

  onAction(arg: any){
    this.acao == "resultados" ? this.verResultados(arg) : this.onContact(arg)
  }

  onContact(arg: any) {
    console.log('111')
  }

  verResultados(id: any){
    this.router.navigate(['resultados', id])
  }
}
