import { Router } from "express";

const route = new Router();

import FotoPerfilController from "../controllers/fotoPerfil";

route.post('/', FotoPerfilController.store);
route.delete('/:id', FotoPerfilController.delete);

export default route;