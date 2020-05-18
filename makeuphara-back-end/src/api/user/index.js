import Router from 'koa-router';
import * as UserController from './controller';

const user = new Router();

user.post('/checkName', UserController.checkExistName);

export default user;
