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
  // @Input() menuNav: boolean = false;

  logado: boolean = false
  home: boolean = false

  constructor(private location: Location, private router: Router) {
    this.location.path() == '' ? this.home = true : this.home = false;
    console.log(this.location.path())
  }


  onBack() {
    this.location.back();
  }

  onNavTo(path: string) {
    this.router.navigate([path])
  }
}
