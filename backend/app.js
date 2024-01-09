import  express  from "express";
import cors from 'cors';
import helmet from "helmet";

import userRoutes from './src/routes/user';
import fotoPerfilRoutes from './src/routes/fotoPerfil';
import PostRoutes from './src/routes/posts';
import ComentsRoutes from './src/routes/coments';
import FollowsRoutes from './src/routes/follow';
import TokenRoute from './src/routes/token';
import likeRoutes from './src/routes/likes';

import confirmLogin from "./src/midlewares/confirmLogin";

import {resolve} from 'path';
import './database/index';

const app = express();

app.use(express.static(resolve(__dirname, 'uploads')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// routes 
app.use('/users/', userRoutes);
app.use('/token/', TokenRoute);
//login required
app.use(confirmLogin);
app.use('/fotoPerfil/', fotoPerfilRoutes);
app.use('/posts/', PostRoutes);
app.use('/coments/', ComentsRoutes);
app.use('/follow/', FollowsRoutes);
app.use('/like/', likeRoutes)


export default app;
