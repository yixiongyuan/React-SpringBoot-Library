export const oktaConfig={

    clientId : '0oa86aqrdfc18e2Uu5d7',
    issuer : 'https://dev-33773530.okta.com/oauth2/default',
    redirectUri : 'http://localhost:3000/login/callback',
    scopes : ['openid','profile','email'],
    pkce:true,
    disableHttpsCheck:true
}