import { AuthConfig } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/thinny_realm',
    redirectUri: 'http://localhost:4200/login',
    clientId: 'angular_client',
    scope: 'openid profile email',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: true
}