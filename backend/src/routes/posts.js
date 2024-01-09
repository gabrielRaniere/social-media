 import { Router } from 'express';

 import PostController from '../controllers/posts';

 const route = new Router();

 route.post('/', PostController.create);
 route.delete('/:id', PostController.delete);
 route.get('/', PostController.index);
 route.get('/:id', PostController.show);
 route.put('/:id', PostController.update);

 export default route;