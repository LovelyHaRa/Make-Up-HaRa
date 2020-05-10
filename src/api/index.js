import Router from 'koa-router';
import auth from './auth/index';
import post from './post/index';
import wiki from './wiki/index';
const api = new Router();

api.use('/auth', auth.routes());
api.use('/post', post.routes());
api.use('/wiki', wiki.routes());

export default api;
