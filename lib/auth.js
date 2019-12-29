const request = require('request');
const querystring = require('querystring');

const accessTokenForm = (code, client_id, redirect_uri) => {
  return {
    grant_type: 'authorization_code',
    access_type: 'offline',
    code: code,
    client_id: client_id,
    redirect_uri: redirect_uri
  };
};

const refreshTokenForm = (refresh_token, client_id) => {
  return {
    grant_type: 'refresh_token',
    access_type: 'offline',
    refresh_token: refresh_token,
    client_id: client_id
  };
};

function getAccessToken(code, client_id, redirect_uri, callback) {
  request({
    method: 'POST',
    uri: 'https://api.tdameritrade.com/v1/oauth2/token',
    body: querystring.stringify(accessTokenForm(code, client_id, redirect_uri)),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, (err, res, body) => {
    callback(err, res, body);
  })
}

function getRefreshToken(refreshToken, client_id, callback) {
  request({
    method: 'POST',
    uri: 'https://api.tdameritrade.com/v1/oauth2/token',
    body: querystring.stringify(refreshTokenForm(refreshToken, client_id)),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, (err, res, body) => {
    callback(err, res, body);
  })
}

module.exports = {
  accessTokenForm: accessTokenForm,
  refreshTokenForm: refreshTokenForm,
  getAccessToken: getAccessToken,
  getRefreshToken: getRefreshToken
}