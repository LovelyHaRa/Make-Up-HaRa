import Router from 'koa-router';
import * as WikiController from './controller';

const wiki = new Router();

wiki.post('/write/:id', WikiController.write);
wiki.get('/request', WikiController.requestDocument);
wiki.post('/title', WikiController.addTitle);

export default wiki;
