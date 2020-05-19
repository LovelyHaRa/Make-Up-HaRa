import Router from 'koa-router';
import * as UserController from './controller';
import isLoggedIn from '../../lib/middleware/isLoggedIn';

const user = new Router();

user.post('/checkName', isLoggedIn, UserController.checkName);
user.patch('/profile', isLoggedIn, UserController.updateName);

export default user;
