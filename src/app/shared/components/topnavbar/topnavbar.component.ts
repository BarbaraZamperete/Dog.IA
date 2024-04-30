import { Component, Input, AfterViewChecked, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
})
export class TopnavbarComponent{


  @Input() logo: boolean = false;
  // @Input() menuNav: boolean = false;

  logado: boolean = false
  home: boolean = false

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.location.path() == '' ? this.home = true : this.home = false;

    this.logado = auth.isLoggedIn()

  }


  onBack() {
    this.location.back();
  }

  onNavTo(path: string) {
    this.router.navigate([path])
  }

  onLogout(){
    this.auth.logout()
    this.router.navigate(['/'])
    this.openSnackBar("Logout realizado com sucesso", "success")
  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }
}
