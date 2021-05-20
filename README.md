# Gist Viewer

Small Node.js app for viewing and favoriting gists from GitHub

## Running the app

### Docker Compose

The `docker-utils` folder contains the `cli.sh` script for running the application as well as a Postgres server, and can be used like the following:

Startup

```bash
$ ./cli.sh up
```

Teardown

```bash
$ ./cli.sh down
```

The folder also contains a docker-compose file to use directly if desired:

```bash
$ docker-compose up -d
```

### Running without Docker

If the app needs to be ran without docker it can be executed using node:

```bash
$ node index.js
```

*NOTE*: The app requires Postgres to support the favorite/unfavorite functions.  The `init.sql` script can be used to initialize a database and table for this functionality. The following environment variables will also need to be configured for the Postgres settings. This is all handled automatically by using the docker compose scripts.

1. DB_USER - The username to use for connecting to Postgres
2. DB_HOST - The host of the Postgres server
3. DB_NAME - The name of the Postgres database
4. DB_PASSWORD - The password to use for connecting to Postgres
5. DB_PORT - The port to use for connecting to Postgres

## Consuming the API

The `postman` folder contains a postman collection for testing the endpoints.  There is a postman environment that can be imported to populate the variables used in the requests.  There are default values provided, but can be overridden for any customization done with the app.

## Time Spent

I admittedly used a lot more time than the allotted 2 hours.  In total, I think I spent about 4 hours total on the project. This was essentially my first time digging into Node.js, so I spent a bit of time researching and getting familiar with that. In addition, I was a litle confused on the requirements and mistook "Favorite" with the GitHub "Star" terminology. After rereading the requirements, I went back and refactored a bit to include the Postgres integration to store the favorite gists.  This was also a little confusing in the requirements as it stated the API should connect to a permanent data store, but none of the functional requirements really made sense to store in any additional store when the GitHub api provided all of the basic functionality required.  Howev

## Improvements

If time allowed, I would make the following additional changes:

1. Add better error handling (This currently assumes everything is pretty much going to go as expected)
2. Additional logging 
3. Add some caching for GitHub requests
4. Unit tests
5. Better configuration support (dev vs. production)
6. Add api documentation