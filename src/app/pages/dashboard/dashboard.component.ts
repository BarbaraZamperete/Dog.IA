import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CachorroService } from '../../services/cachorro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  cachorrosBuscados$: Observable<any>
  cachorrosAvistados$: Observable<any>
  usuario: string | null = "Usuário"
  id: string | null = "1"

  constructor(
    private cachorroService: CachorroService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    const username =  this.auth.getUsername()
    const id =  this.auth.getUserId()

    if (username && id ) {
      this.usuario = username;
      this.id = id;
      this.getCachorrosServidor()
    } else {
      // Redirecionar para outra página se username ou id forem nulos
      this.router.navigate(['/login']);
    }
  }

  getCachorrosServidor() {
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser(this.id ? this.id : '1')
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser(this.id ? this.id : '1')
  }

  onAdicionar(tipo: string) {
    this.router.navigate(['/cadastro/cachorro', tipo])
  }

}
