require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api/index';
import { initDatabase } from './database';
import session from 'koa-session';
import cors from '@koa/cors';
import verifyJwt from './lib/middleware/verifyJwt';
import path from 'path';
import send from 'koa-send';
import serve from 'koa-static';

const app = new Koa();
const router = new Router();

app.use(cors());

router.use('/api', api.routes());

app.use(bodyParser());
app.use(verifyJwt);

app.keys = ['secret'];
app.use(session({}, app));

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(
  __dirname,
  '../../makeuphara-front-end/build',
);
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const { PORT } = process.env;

app.listen(PORT || 4000, () => {
  console.log('Listening to port ' + PORT);
  initDatabase();
});
