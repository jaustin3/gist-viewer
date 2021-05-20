const axios = require('axios')
const config = require('../config/config')
const GITHUB_BASE_URL = 'https://api.github.com'

async function getGistsForUser(username) {
    var data = await axios.get(GITHUB_BASE_URL + `/users/${username}/gists`).then(res => res.data);
    return data;
}

async function getGistById(gistId){
    var gist = await axios.get(GITHUB_BASE_URL + `/gists/${gistId}`)
    .then(res => res.data)
    .catch(err => console.log(err));
    return gist;
}

async function getStarredGists(){
    var gist_list = await axios.get(GITHUB_BASE_URL + '/gists/starred', {
        headers: {
            Authorization: 'Token ' + config.token
        }
    })
    .catch(err => console.log(err));
    return gist_list;
}

async function starGist(gistId){
    console.log(config.token);
    await axios.put(GITHUB_BASE_URL + `/gists/${gistId}/star`, {}, {
        headers: {
            Authorization: 'Token ' + config.token
        }
    });
}

async function unStarGist(gistId){
    await axios.delete(GITHUB_BASE_URL + `/gists/${gistId}/star`, {
        headers: {
            Authorization: 'Token ' + config.token
        }
    })
    .catch(err => console.log(err));
}

module.exports = { getGistsForUser, getGistById, starGist, unStarGist, getStarredGists }