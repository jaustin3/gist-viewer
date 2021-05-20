const Pool = require('pg').Pool
const pool = new Pool({
  user: 'docker',
  host: 'localhost',
  database: 'gistviewerdb',
  password: 'docker',
  port: 5432,
})

async function setFavorite(gistId) {
  await pool.query('INSERT INTO GistFavorites(GitHubGistId) VALUES($1)', [gistId])
}

async function deleteFavorite(gistId){
  await pool.query('DELETE GistFavorites WHERE GitHubGistId = $1', [gistId])
}

module.exports = { setFavorite, deleteFavorite }