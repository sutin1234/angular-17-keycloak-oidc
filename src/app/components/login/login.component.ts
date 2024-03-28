import { Component, inject, OnInit } from '@angular/core';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { authCodeFlowConfig } from '../../auth.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h2>Login</h2>
      <button (click)="onLogin()">Login</button>
    </div>
  `,
  styles: ``
})
export class LoginComponent implements OnInit {
  oauthService = inject(OAuthService);

  constructor() {
    this.configure();
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
  }

  ngOnInit(): void {
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.oauthService.loadUserProfile();
      }
    })
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }

  public signIn() {
    this.oauthService.initLoginFlow();
  }

  public signOut() {
    this.oauthService.logOut();
  }


  onLogin() {
    this.signIn()
  }

  private configure() {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }
}
