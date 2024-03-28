export const environment = {
    authConfig: {
        issuer: 'http://localhost:8080/auth/realms/thinny_realm',
        redirectUri: window.location.origin,
        clientId: 'angular_client',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        disableAtHashCheck: true,
        showDebugInformation: true
    }
};
