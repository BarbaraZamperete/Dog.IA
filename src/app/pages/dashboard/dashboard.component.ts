import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  cachorrosBuscados$: Observable<any>
  cachorrosAvistados$: Observable<any>
  usuario: string = "Usuário"
  id: string = "1"

  constructor(
    private cachorroService: CachorroService,
    private router: Router,
    private auth: AuthService
  ) {
    const id = auth.getUserId()
    const username = auth.getUsername();
    if (username !== null) {
      this.usuario = username; // Esta atribuição agora é segura, pois garantimos que username não é nulo
    }
    if (id !== null){
      this.id = id
    }

    this.getCachorrosServidor()
  }

  getCachorrosServidor() {
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser(this.id)
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser(this.id)
  }

  onAdicionar(tipo: string) {
    this.router.navigate(['/cadastro/cachorro', tipo])
  }

}
