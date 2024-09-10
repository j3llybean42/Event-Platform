// import pg from 'pg'
const pg = require("pg")
const { Pool } = pg

require('dotenv').config({path: `${__dirname}/../.env.production`});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

if (!process.env.DB_NAME) {
    throw new Error('DATABASE not set')
}

module.exports = pool