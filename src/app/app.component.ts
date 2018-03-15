import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-board></app-board>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'app';
}
