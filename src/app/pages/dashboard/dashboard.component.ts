import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CachorroService } from '../../services/cachorro.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionStorageService } from '../../services/session-storage.service';

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
    private sessionStorageService: SessionStorageService
  ) {
    // const id = auth.getUserId()
    // const username = auth.getUsername();
    // if (username !== null) {
    //   this.usuario = username; // Esta atribuição agora é segura, pois garantimos que username não é nulo
    // }
    // if (id !== null){
    //   this.id = id
    // }
    // console.log(id, username)


    // this.getCachorrosServidor()
  }

  async ngOnInit() {
    const username = await this.sessionStorageService.getUsername();
    const id = await this.sessionStorageService.getUserId();

    if (username !== null && id !== null) {
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
