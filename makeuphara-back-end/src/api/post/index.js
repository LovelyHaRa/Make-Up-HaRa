import Router from 'koa-router';
import * as PostController from './controller';
import isLoggedIn from '../../lib/middleware/isLoggedIn';

const post = new Router();

post.post('/write', isLoggedIn, PostController.write);

const postId = new Router();
postId.patch('/', isLoggedIn, PostController.update);
postId.delete('/', isLoggedIn, PostController.remove);
postId.get('/', PostController.read);

post.use('/:id', PostController.getPostById, postId.routes());

export default post;
