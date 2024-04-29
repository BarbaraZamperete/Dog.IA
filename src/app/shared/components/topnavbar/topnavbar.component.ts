import { Component, Input, AfterViewChecked, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';


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
    private auth: AuthService
  ) {
    this.location.path() == '' ? this.home = true : this.home = false;

    this.logado = auth.isLoggedIn()
    console.log(this.logado)

  }


  onBack() {
    this.location.back();
  }

  onNavTo(path: string) {
    this.router.navigate([path])
  }
}
