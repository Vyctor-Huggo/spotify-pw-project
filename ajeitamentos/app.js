require('dotenv').config();
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.port;

// Middleware para usar Pug e cookies
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

// URLs do Spotify
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Variáveis de ambiente
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

app.use(express.static(path.join(__dirname, 'public')));

// Função para gerar um ID aleatório (para o estado)
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Rota para exibir a página inicial
app.get('/', (req, res) => {
  res.redirect('/home')
});

app.get('/home', (req, res) => {
  res.render('home');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login/redirect', (req, res) => {
  res.redirect('/login/auth');
})

// Rota para iniciar a autenticação com o Spotify
app.get('/login/auth', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-email user-top-read';
  const queryParams = querystring.stringify({
    client_id: client_id,
    response_type: 'code',
    redirect_uri: redirect_uri,
    state: state,
    scope: scope
  });

  res.redirect(`${SPOTIFY_AUTH_URL}?${queryParams}`);
});

// Callback da autorização do Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(SPOTIFY_TOKEN_URL, querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret
    }));

    const { access_token, refresh_token } = response.data;
    res.cookie('access_token', access_token);
    res.redirect('/playlists');
  } catch (error) {
    res.redirect('/?error=invalid_token');
  }
});

// Rota para buscar e exibir as playlists
app.get('/playlists', async (req, res) => {
  const access_token = req.cookies.access_token;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const artists = response.data.items;

    // Coletar o álbum mais ouvido para cada artista
    const artistsWithAlbums = await Promise.all(artists.map(async (artist) => {
      const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const albums = albumsResponse.data.items;
      let mostListenedAlbum = null;

      // Aqui você pode adicionar lógica para determinar qual álbum é o "mais ouvido"
      if (albums.length > 0) {
        mostListenedAlbum = albums[0]; // Exemplo simples: apenas pega o primeiro álbum
      }

      return {
        ...artist,
        mostListenedAlbum,
      };
    }));

    res.render('playlists', { artists: artistsWithAlbums });
  } catch (error) {
    res.redirect('/?error=fetch_error');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
