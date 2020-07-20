import Router from 'koa-router';
import * as SearchController from './controller';

const search = new Router();

search.get('/total', SearchController.totalSearch);

export default search;
