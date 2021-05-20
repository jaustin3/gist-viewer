const config = require('../config/config')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.db_user,
  host: config.db_host,
  database: config.db_name,
  password: config.db_password,
  port: config.db_port,
})

async function setFavorite(gistId) {
  await pool.query('INSERT INTO GistFavorites(GitHubGistId) VALUES($1)', [gistId])
    .catch(err => console.log(`An error occurred while setting gist ${gistId} as favorite`))
}

async function deleteFavorite(gistId) {
  await pool.query('DELETE FROM GistFavorites WHERE GitHubGistId = $1', [gistId])
    .catch(err => console.log(`An error occurred while unfavoriting gist ${gistId}`))
}

async function getFavorites(page = 1, page_size = 30) {
  let offset = (page - 1) * page_size
  let results = await pool.query('SELECT GitHubGistId FROM GistFavorites ORDER BY favoriteid LIMIT $1 OFFSET $2', [page_size, offset])
    .catch(err => console.log(`An error occurred while retrieving favorited gists: ${err}`))
  return results.rows
}

module.exports = { setFavorite, deleteFavorite, getFavorites }