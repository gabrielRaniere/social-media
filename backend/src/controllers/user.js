import UserModel from "../models/User";
import FotoPerfil from "../models/fotoPerfil";
import PostModel from "../models/Post";
import FollowModel from "../models/follow";
import LikeModel from  '../models/Like';

import {get} from 'lodash';

export default class User{
    static async index(req, res) {
        try{
            const user = await UserModel.findAll({
                include: [
                    {model: FotoPerfil},
                    {
                        model: PostModel,
                        attributes: ['id'],
                    },
                    {
                        model: FollowModel,
                        attributes: ['quem_segue', 'seguido'],
                        foreignKey: 'quem_segue'
                    },
                ],
                order: [[PostModel, 'createdAt', 'DESC']]
              }
              )

              res.json(user)
        }catch(e) {
            res.status(400).json('algo deu errado..');
            console.log(e);
        }
    }

    static async create(req, res) {
        try {
            if(
                !req.body.password ||
                !req.body.email ||
                !req.body.nome
            ) res.json('atributos devem ser enviados !');

            const newUser =  await UserModel.create(req.body);

            res.json(newUser);
        }catch(err) {
            res.status(400).json({
                "errors": get(err, 'errors', []).map(e => e.message)     
            });
            console.log(err);
        }
    }

    static async show(req, res) {
        try {
            const {id} = req.params;
            const returnedUser = await UserModel.findByPk(id,{
                include: [
                    {model: FotoPerfil},
                    {
                        model: PostModel,
                        attributes: [ 'id', 'img'],
                        include: [{model: LikeModel}]
                    },
                    {
                        model: FollowModel,
                        attributes: ['quem_segue', 'seguido'],
                        foreignKey: 'quem_segue'
                    },
                ],
                order: [[PostModel, 'createdAt', 'DESC']]
              });

            if(!returnedUser) {
                res.status(404).json('usuário não encontrado');
            }

            res.json(returnedUser)

        }catch(err) {   
            res.status(400).json('algo deu errado...');

            console.log(err);
        }
    }


    static async update(req, res) {
        try {
            const {id} = req.params;
            const returnedUser = await UserModel.findByPk(id);

            if(!returnedUser) {
                res.status(404).json('usuário não encontrado');
            }

            const updatedUser = await returnedUser.update(req.body);

            res.json(updatedUser)
        }catch(err) {
            console.log(err);
            res.status(400).json('algo deu errado...');        
        }
    }


    static async delete(req, res) {
        try {
            const {id} = req.params;
            const returnedUser = await UserModel.findByPk(id);

            if(!returnedUser) {
                res.status(404).json('usuário não encontrado');
            }

            await returnedUser.destroy(req.body);

            res.json('user excluded !')
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }
};