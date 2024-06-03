import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'highfield';
  readonly ROUTER_TOKENS = ROUTER_TOKENS
}
