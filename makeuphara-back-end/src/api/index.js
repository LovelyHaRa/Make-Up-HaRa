import Router from 'koa-router';
import auth from './auth/index';
import post from './post/index';
import wiki from './wiki/index';
import user from './user/index';
import search from './search/index';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/post', post.routes());
api.use('/wiki', wiki.routes());
api.use('/user', user.routes());
api.use('/search', search.routes());

export default api;
