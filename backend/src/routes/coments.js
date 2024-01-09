import {Router} from 'express';
import ComentController from '../controllers/coments';

const route = new Router();

route.post('/', ComentController.create);
route.put('/', ComentController.edit);
route.delete('/:id', ComentController.delete);

export default route;