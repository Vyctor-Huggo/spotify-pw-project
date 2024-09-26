var express = require('express');
var router = express.Router();
const querystring = require('querystring');


function genID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

router.get('/', function(req, res, next) {
  const state = genID(16);
  const scope = 'user-read-email user-top-read';
  const queryParams = querystring.stringify({
    client_id: 'd3250692f25240fd8c7552662422cf57',
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/callback',
    state: state,
    scope: scope
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

module.exports = router;