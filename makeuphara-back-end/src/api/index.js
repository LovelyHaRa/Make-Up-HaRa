import Router from 'koa-router';
import auth from './auth/index';
const api = new Router();

api.get('/test', ctx => {
  ctx.body = 'test 성공 ';
  ctx.body += ctx.state.user && ctx.state.user.username;
});

api.use('/auth', auth.routes());

export default api;
