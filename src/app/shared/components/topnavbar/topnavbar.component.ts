import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
})
export class TopnavbarComponent {

  @Input() logo: boolean = false;

  logado: boolean = true

  constructor(private location: Location, private router: Router) { }


  onBack(){
    this.location.back();
  }

  onNavTo(path: string){
    this.router.navigate([path])
  }
}
