import FollowModel from "../models/follow";
import User from '../models/User';
import FotoPerfil from '../models/fotoPerfil';

export default class FollowController{
    static async post(req, res) {
        try {
            const {quem_segue, seguido} = req.body;

            const previousUser = await FollowModel.findOne({
                where: {
                    quem_segue,
                    seguido
                }
            });

            if(previousUser) return res.status(400).json('você já segue esse user');

            const follower = await FollowModel.create({
                quem_segue,
                seguido
            });

            res.json(follower);
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }

    static async delete(req, res) {
        try{
            const follower = await FollowModel.findOne({
                where: req.body
            });
            console.log(follower)

            if(!follower) return res.status(400).json('algo deu errado');


            await follower.destroy();

            res.json('parou de seguir !');
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }

    static async index(req, res) {
        try {
            const {id} = req.params;
            
            const segue = await FollowModel.findAll({
                where: {quem_segue: id},
                include: {
                    model: User,
                    attributes: ['id', 'nome'],
                    include: {
                        model: FotoPerfil,
                    }
                }
            })

            res.json(segue);
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }
}