import {Router} from 'express';
import FollowController from '../controllers/follows';

const route = new Router();

route.post('/', FollowController.post);
route.delete('/', FollowController.delete);
route.get('/:id', FollowController.index);

export default route;