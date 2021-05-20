require('dotenv').config()

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const client = require('./client/github_client')
const repo = require('./repository/gistRepo')

// Get public gists for user
app.get('/api/users/:username/gists', async function (req, res) {
  gist_list = await client.getGistsForUser(req.params.username, req.query.page, req.query.page_size);
  res.send(gist_list);
});

// Get list of favorite gists
app.get('/api/gists/favorites', async function (req, res) {
  let promises = []
  let gists = []

  // Get list of favorited id's from database
  let fav_gist_ids = await repo.getFavorites(req.query.page, req.query.page_size);
  fav_gist_ids.forEach(gist_id => {
    promises.push(client.getGistById(gist_id.githubgistid));
  });

  // Get gist details for each favorite from GitHub
  await Promise.all(promises).then(function (r){
    gists.push(r)
  })
  .catch(err => console.log(err))
  res.send(gists)
});

// Get Gist by id
app.get('/api/gists/:gistId', async function (req, res) {
  gist = await client.getGistById(req.params.gistId);
  res.send(gist);
});

// Set gist as favorite
app.put('/api/gists/:gistId/favorite', async function (req, res) {
  await repo.setFavorite(req.params.gistId)
  res.status(204).send();
});

// Unfavorite gist
app.delete('/api/gists/:gistId/favorite', async function (req, res) {
  await repo.deleteFavorite(req.params.gistId);
  res.status(204).send();
});

app.listen(port);
