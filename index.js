const express = require('express');
const auth = require('./lib/auth.js');
const app = express();
const port = 8080;

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
var code = null
var accessToken = null;
var refreshToken = null;

app.get('/code', (req, res) => {
  code = decodeURI(req.query.code);
  res.end();
});

app.get('/token', (req, res) => {
  if(accessToken) { res.send({ token: accessToken }); }
  else { auth.getAccessToken(code, client_id, redirect_uri, (err, response, body) => {
    data = JSON.parse(body);
    accessToken = data.access_token;
    refreshToken = data.refresh_token;
    res.send({ token: data.access_token });
  }); }
});

setInterval(() => {
  if(refreshToken) {
    getRefreshToken(refreshToken, client_id, (err, res, body) => {
      data = JSON.parse(body);
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
    });
  }
}, 1500000);

app.listen(port, () => console.log(`Listening on port ${port}!`));