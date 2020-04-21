import Router from 'koa-router';
import * as WikiController from './controller';

const wiki = new Router();

wiki.post('/write/:id', WikiController.getTitleById, WikiController.write);
wiki.get('/request', WikiController.requestDocument);
wiki.post('/title', WikiController.addTitle);
wiki.get('/title/:id', WikiController.getTitleById, WikiController.getTitle);

export default wiki;
