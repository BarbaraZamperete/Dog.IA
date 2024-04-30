import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CachorroService } from '../../services/cachorro.service';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private activedRoute: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.id = this.activedRoute.snapshot.queryParamMap.get('id');
  }

  ngOnInit() {
    const username =  this.auth.getUsername()

    if (username && this.id) {
      this.usuario = username;
      this.getCachorrosServidor()
    } else {
      // Redirecionar para outra página se username ou id forem nulos
      this.router.navigate(['/login']);
      this.openSnackBar("Você precisar estar logado para acessar", "error")
    }
  }

  getCachorrosServidor() {
    this.cachorrosBuscados$ = this.cachorroService.getCachorrosBuscadosByUser(this.id ? this.id : '1')
    this.cachorrosAvistados$ = this.cachorroService.getCachorrosAvistadosByUser(this.id ? this.id : '1')
  }

  onAdicionar(tipo: string) {
    this.router.navigate(['/cadastro/cachorro', tipo])
  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }

}
