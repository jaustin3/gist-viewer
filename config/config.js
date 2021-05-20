var config = {};

config.db_user = process.env.DB_USER;
config.db_host = process.env.DB_HOST;
config.db_name = process.env.DB_NAME;
config.db_password = process.env.DB_PASSWORD;
config.db_port = process.env.DB_PORT;

module.exports = config