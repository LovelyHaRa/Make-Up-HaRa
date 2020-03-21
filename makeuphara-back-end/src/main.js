require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api/index';
import { initDatabase } from './database';
import passport from 'koa-passport';
import session from 'koa-session';
import ConfigPassport from './config/passport';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());

app.keys = ['secret'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

ConfigPassport(passport);

app.use(router.routes()).use(router.allowedMethods());

const { PORT } = process.env;

app.listen(PORT || 4000, () => {
  console.log('Listening to port 4000');
  initDatabase();
});
