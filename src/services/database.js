'use strict';

const { DB_HOST, DB_DATABASE, DB_PW, DB_USER } = require('../config');

const knex = require('knex')({
  client: 'mssql',
  connection: {
    host : DB_HOST,
    user : DB_USER,
    password : DB_PW,
    database : DB_DATABASE
  }
});

// you can add more helpers here to ease logic in other places
// like a create user function
/**
 * function createUser(user) {
 *   try {
 *     await knex.insert(user, 'id').into('dbo.users');
 *   } catch (error) {
 *     // log error
 *     throw error
 *   }
 *   return;
 * }
 */

module.exports = {
  knex
};
