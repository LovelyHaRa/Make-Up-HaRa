import Router from 'koa-router';
import * as WikiController from './controller';

const wiki = new Router();

wiki.post('/write/:id', WikiController.write);

export default wiki;
