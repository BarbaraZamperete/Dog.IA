import { Component } from '@angular/core';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
})
export class TopnavbarComponent {

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
