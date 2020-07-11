import Router from 'koa-router';
import * as PostController from './controller';
import isLoggedIn from '../../lib/middleware/isLoggedIn';

const post = new Router();

post.get('/list', PostController.list);
post.post('/write', isLoggedIn, PostController.write);

const postId = new Router();
postId.patch('/', isLoggedIn, PostController.update);
postId.delete('/', isLoggedIn, PostController.remove);
postId.get('/', PostController.read);
postId.post('/comment', isLoggedIn, PostController.writeComment);
postId.patch('/comment/:commentId', isLoggedIn, PostController.updateComment);
postId.delete('/comment/:commentId', isLoggedIn, PostController.deleteComment);
postId.get('/comment', PostController.getCommentList);

post.use('/:id', PostController.getPostById, postId.routes());

export default post;
