import { Router } from "express";
import UserController from "../controllers/user";
import confirmLogin from "../midlewares/confirmLogin";

const route = new Router();

route.get('/', confirmLogin, UserController.index);
route.post('/', UserController.create);
route.get('/:id', confirmLogin, UserController.show);
route.put('/:id', confirmLogin, UserController.update);
route.delete('/:id', confirmLogin, UserController.delete);

export default route;