import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="home">Home</a> | 
        <a routerLink="login">Login</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-17-oidc-keycloak';
}
