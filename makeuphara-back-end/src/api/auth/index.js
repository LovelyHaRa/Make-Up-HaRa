import Router from 'koa-router';
import * as AuthController from './controller';

const auth = new Router();

auth.get('/login/google', AuthController.authGoogle);
auth.get('/login/google/callback', AuthController.authGoogleCallback);
auth.get('/logout', AuthController.logout);

export default auth;
