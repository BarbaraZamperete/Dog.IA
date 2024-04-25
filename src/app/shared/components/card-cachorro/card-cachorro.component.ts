import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CachorroService } from '../../../services/cachorro.service';

@Component({
  selector: 'app-card-cachorro',
  templateUrl: './card-cachorro.component.html',
  styleUrl: './card-cachorro.component.scss'
})
export class CardCachorroComponent {

  @Input() cachorros: any[]
  @Input() acao: string
  @Input() botaoNome: string
  @Input() tipo: number = 1
  dashboard: boolean = false

  constructor(private router: Router, private cachorroService: CachorroService) {
    this.dashboard = this.router.url=="/dashboard" ? true : false;
  }

  onAction(arg: any) {
    this.acao == "resultados" ? this.verResultados(arg) : this.onContact(arg)
  }

  onContact(arg: any) {
    console.log('111')
  }

  verResultados(id: any) {
    this.router.navigate(['resultados', id])
  }

  changeStatus(id: number, nome: string){
    const confirmed = confirm(`Deseja realmente alterar o status de ${nome} para encontrado?`)
    if(confirmed){
      this.cachorroService.changeStatus(id, false).subscribe(res => window.location.reload())
    }

  }
}
