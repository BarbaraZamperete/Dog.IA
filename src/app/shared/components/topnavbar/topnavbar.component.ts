import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
})
export class TopnavbarComponent {

  @Input() logo: boolean = false;
  @Input() voltar: string = '/';

  logado: boolean = true

  constructor(private router: Router) { }


  onClick(rota = this.voltar){
    this.router.navigate([rota]);
  }
}
