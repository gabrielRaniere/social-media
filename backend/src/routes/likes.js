import {Router} from 'express';
import LikeController from '../controllers/likes';

const router = new Router();

router.post('/', LikeController.create);
router.delete('/:id', LikeController.remove);

export default router;