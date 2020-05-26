import Router from 'koa-router';
import * as UserController from './controller';
import isLoggedIn from '../../lib/middleware/isLoggedIn';

const user = new Router();

user.post('/check/username', UserController.checkUsername);
user.post('/check/name', UserController.checkName);
user.patch('/profile', isLoggedIn, UserController.updateName);
user.patch('/password', isLoggedIn, UserController.changePassword);

export default user;
