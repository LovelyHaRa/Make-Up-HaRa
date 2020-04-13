import Router from 'koa-router';
import * as AuthController from './controller';

const auth = new Router();

auth.post('/register', AuthController.register);
auth.post('/login', AuthController.login);
auth.get('/check', AuthController.check);
auth.post('/logout', AuthController.logout);

auth.post('/login/google', AuthController.loginWithGoogle);
auth.post('/login/naver', AuthController.loginWithNaver);
auth.post('/login/kakao', AuthController.loginWithKakao);

export default auth;
