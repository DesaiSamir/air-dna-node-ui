const fs = require("fs");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

// Constants
module.exports = {
    conn_str: {
		host: process.env.DATABASE_HOST || "localhost",
		port: process.env.DATABASE_PORT,
		database: process.env.DATABASE_DB,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD
    },
    port: process.env.PORT || 3003,
    // if you're not using docker-compose for local development, this will default to 8080
    // to prevent non-root permission problems with 80. Dockerfile is set to make this 80
    // because containers don't have that issue :)
    base_url_legacy: process.env.BASE_URL_LEGACY,
    base_url_v1: process.env.BASE_URL_V1,
    base_url_v2: process.env.BASE_URL_V2,
    access_token: process.env.ACCESS_TOKEN
  
};
