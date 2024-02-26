import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements DoCheck{

  title: string = '';

  constructor(private router: Router, private _location: Location) {
  }

  ngDoCheck(): void {
    this.setTitle();
  }

  setTitle() {
    switch (this.router.url) {
      case '/tasks' : this.title = 'Tarefas'
      break;
      case '/home' : this.title = 'Home'
      break;
      default : this.title = this.router.url.replace('/', '');
    }
  }

  navegateTo(route: string) {
    this.router.navigate([route]);
  }

  back() {
    this._location.back();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
