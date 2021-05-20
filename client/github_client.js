const axios = require('axios')
const config = require('../config/config')
const GITHUB_BASE_URL = 'https://api.github.com'

async function getGistsForUser(username, page = 1, page_size = 30) {
    console.log(`Getting page ${page} of size ${page_size} of gists for user ${username}`);
    let data = await axios.get(GITHUB_BASE_URL + `/users/${username}/gists?page=${page}&per_page=${page_size}`)
        .then(res => res.data);
    return data;
}

async function getGistById(gistId) {
    let gist = await axios.get(GITHUB_BASE_URL + `/gists/${gistId}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    return gist;
}

async function getStarredGists() {
    let gist_list = await axios.get(GITHUB_BASE_URL + '/gists/starred', {
        headers: {
            Authorization: `token ${config.token}`
        }
    })
        .then(res => res.data)
        .catch(err => console.log(err));
    return gist_list;
}

async function starGist(gistId) {
    await axios.put(GITHUB_BASE_URL + `/gists/${gistId}/star`, {}, {
        headers: {
            Authorization: `token ${config.token}`
        }
    });
}

async function unStarGist(gistId) {
    await axios.delete(GITHUB_BASE_URL + `/gists/${gistId}/star`, {
        headers: {
            Authorization: 'Token ' + config.token
        }
    })
        .catch(err => console.log(err));
}

module.exports = { getGistsForUser, getGistById, starGist, unStarGist, getStarredGists }