'use strict';

/**
 * Config Variables for the app
 */
module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'oh so secret',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_USER: process.env.DB_USER || 'sa',
  DB_PW: process.env.DB_PW || 'Password1!',
  DB_DATABASE: process.env.DB_DATABASE || 'kostadb'
};
