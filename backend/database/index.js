import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
// models
import UserModel from '../src/models/User';
import FotoPerfilModel from '../src/models/fotoPerfil';
import PostModel from '../src/models/Post';
import ComentModel from '../src/models/Coment';
import FollowModel from '../src/models/follow';
import LikeModel from '../src/models/Like';

const conection = new Sequelize(dbConfig);

const models = [UserModel, FotoPerfilModel, PostModel, ComentModel, FollowModel, LikeModel];

models.forEach(model => model.init(conection));

models.forEach(model => model.associate && model.associate(conection.models));
