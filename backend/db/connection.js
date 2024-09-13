const pg = require("pg")
const { Pool } = pg
const ENV = process.env.NODE_ENV || 'dev';

require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
  });
  
  if (!process.env.DB_NAME && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE or DATABASE not set');
  }
  
  const config = {};
  
  if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
  }

  if(ENV === 'dev') {
    config.user = process.env.DB_USER
    config.host = process.env.DB_HOST
    config.database = process.env.DB_NAME
    config.password = process.env.DB_PASSWORD
    config.port = process.env.DB_PORT
  }
  
  module.exports = new Pool(config);
