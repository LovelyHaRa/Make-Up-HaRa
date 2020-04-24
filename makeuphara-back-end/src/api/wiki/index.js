import Router from 'koa-router';
import * as WikiController from './controller';
import isLoggedIn from '../../lib/middleware/isLoggedIn';

const wiki = new Router();

wiki.post(
  '/write/:id',
  isLoggedIn,
  WikiController.getTitleById,
  WikiController.write,
);
wiki.get('/request', WikiController.requestDocument);
wiki.post('/title', WikiController.addTitle);
wiki.get('/title/:id', WikiController.getTitleById, WikiController.getTitle);

wiki.get('/list', WikiController.getList);

wiki.get('/doc/:id', WikiController.getTitleById, WikiController.readDocument);

const document = new Router();
document.get('/', WikiController.readDocument);
document.get('/history', WikiController.getHistory);
wiki.use('/:id', WikiController.getTitleByName, document.routes());

export default wiki;
