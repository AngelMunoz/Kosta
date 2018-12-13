'use strict';

const { JwtService } = require('../services/jwt');
const { hash, compare } = require('bcryptjs');
const { logger } = require('../services/logger');
const { knex } = require('../services/database');

async function login(ctx, next) {
  await next();
  if (!ctx.request.body || !ctx.request.body.email || !ctx.request.body.password) {
    ctx.response.status = 400;
    ctx.body = { error: 'Missing Fields' };
    return;
  }
  const payload = Object.assign({}, ctx.request.body);
  const [creds] = await knex.from('dbo.users')
    .select(['email', 'password'])
    .where('email', payload.email)
    .limit(1);
  if(!creds) {
    ctx.response.status = 404;
    ctx.body = { message: 'Not Found' };
    return;
  }
  const valid = await compare(payload.password, creds.password);

  if (!valid) {
    ctx.response.status = 403;
    ctx.body = { error: 'Invalid Credentials' };
    return;
  }

  const jwts = new JwtService();
  const token = await jwts.issueToken({ user: { id: creds.id, email: creds.email } });
  ctx.body = { token, user: creds.id };
}

async function signup(ctx, next) {
  await next();
  if (!ctx.request.body) {
    ctx.response.status = 400;
    ctx.body = { error: 'Missing Request Body' };
    return;
  }
  const user = Object.assign({}, ctx.request.body);
  user.password = await hash(user.password, 10);
  try {
    await knex.insert(user, 'id').into('dbo.users');
  } catch (error) {
    logger.warn(`[${__filename}]:[SignUp] - ${error.message}`);
    ctx.response.status = 422;
    if (error.number === 2627) {
      ctx.body = { error: 'That Email is already in use.' };
      return;
    }
    ctx.body = { error: 'Missing Request Body' };
    return;
  }
  ctx.response.status = 202;
}

module.exports = {
  login,
  signup
};
