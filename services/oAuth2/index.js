require('dotenv').config();
const express = require('express');
const { Issuer, generators } = require('openid-client');


const app = express();

let client;
let codeVerifier;
let codeChallenge;
let redirectUri = process.env.REDIRECT_URI;

// Discover Google’s OIDC configuration
async function configureClient() {
  const googleIssuer = await Issuer.discover('https://accounts.google.com');

  client = new googleIssuer.Client({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [redirectUri],
    response_types: ['code'],
  });
}

app.get('/login', async (req, res) => {
  codeVerifier = generators.codeVerifier();
  codeChallenge = generators.codeChallenge(codeVerifier);

  const authorizationUrl = client.authorizationUrl({
    scope: 'openid email profile',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  res.redirect(authorizationUrl);
});

app.get('/success', async (req, res) => {
  const params = client.callbackParams(req);

  const tokenSet = await client.callback(redirectUri, params, {
    code_verifier: codeVerifier,
  });

  const userinfo = await client.userinfo(tokenSet.access_token);

  res.send(`
    <h1>Login Successful</h1>
    <p>Name: ${userinfo.name}</p>
    <p>Email: ${userinfo.email}</p>
    <img src="${userinfo.picture}" alt="profile pic"/>
  `);
});

app.get('/', (req, res) => {
  res.send('<a href="/login">Login with Google</a>');
});

configureClient().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
