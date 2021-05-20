CREATE DATABASE gistviewerdb;
\c gistviewerdb;

CREATE TABLE IF NOT EXISTS GistFavorites(
FavoriteId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
GitHubGistId varchar(100)
);