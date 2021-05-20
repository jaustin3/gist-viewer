require('dotenv').config()

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const { response } = require('express');
const client = require('./client/github_client')
const repo = require('./repository/gistRepo')

app.get('/api/users/:username/gists', async function (req, res) {
  gist_list = await client.getGistsForUser(req.params.username);
  res.send(gist_list);
});

app.get('/api/gists/favorites', async function (req, res) {
  gist_list = await client.getStarredGists();
  res.send(gist_list)
});

app.get('/api/gists/:gistId', async function (req, res) {
  gist = await client.getGistById(req.params.gistId);
  res.send(gist);
});

app.put('/api/gists/:gistId/favorite', async function (req, res) {
  await repo.setFavorite(req.params.gistId)
  res.status(204).send();
});

app.delete('/api/gists/:gistId/favorite', async function (req, res) {
  await repo.deleteFavorite(req.params.gistId);
  res.status(204).send();
});

app.listen(port);
