import { JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export interface MyClaims {
  exp?: number
  iat?: number
  auth_time?: number
  jti?: string
  iss?: string
  aud?: string
  sub?: string
  typ?: string
  azp?: string
  nonce?: string
  session_state?: string
  at_hash?: string
  acr?: string
  sid?: string
  email_verified?: boolean
  name?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
  email?: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div>
     <h2>Home</h2>
     @if(!idToken()){
        <button (click)="Logout()">LogOut</button>
      } @else {
        <div>
          full name: {{ myClaims().name }} <br />
          email: {{ myClaims().email }} <br />
          email_verified: {{ myClaims().email_verified }} <br />
           <button (click)="Logout()">LogOut</button>  
        </div>
      }
    </div>
  `,
  styles: ``
})
export class HomeComponent implements OnInit {
  oauthService = inject(OAuthService);
  idToken = signal<string | null>(null)
  myClaims = signal<MyClaims>({})

  constructor() {
    effect(() => {
      console.log('token: ', this.idToken())
    })
  }

  ngOnInit(): void {
    this.oauthService.events.subscribe(e => {
      console.log('event', e)
    })

    const claims: MyClaims | Record<string, any> = this.oauthService.getIdentityClaims();
    console.log('claims', claims);
    if (claims) {
      this.myClaims.update(() => claims as MyClaims)
    }
    this.idToken.update(() => this.oauthService.getIdToken())
  }


  Logout() {
    this.oauthService.logOut()
    window.location.href = '/login'
  }
}
