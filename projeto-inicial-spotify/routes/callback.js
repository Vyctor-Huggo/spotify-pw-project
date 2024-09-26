var express = require('express');
var router = express.Router();
const querystring = require('querystring');

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/callback',
      client_id: 'd3250692f25240fd8c7552662422cf57',
      client_secret: 'd3250692f25240fd8c7552662422cf57'
    }));

    const { access_token, refresh_token } = response.data;
    res.cookie('access_token', access_token);
    res.redirect('/playlists');
  } catch (error) {
    res.redirect('/?error=invalid_token');
  }
});

module.exports = router;