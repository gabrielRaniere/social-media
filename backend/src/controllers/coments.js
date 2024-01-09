import ComentModel from "../models/Coment";
import FotoPerfil from '../models/fotoPerfil';
import User from '../models/User';

export default class ComentController{
    static async create(req, res) {
        try {
            const comment =  await ComentModel.create(req.body);
            const allComents = await ComentModel.findAll({
                where: {post_id: comment.post_id},
                include: [{
                    model: User,
                    attributes:['nome'],
                    include: [{
                        model: FotoPerfil,
                    }]
                }]
            });

            res.json(allComents);
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado..');
        }
    }

    static async edit(req, res) {
        try{
            const { message, id } = req.body;

            if(!message) return res.status(400).json('mensagem não enviada!');

            const coment = await ComentModel.findByPk(id, {
                attributes: ['message', 'user_id', 'post_id', 'id', 'createdAt', 'updatedAt']
            });
            const edited = await coment.update({message});

            res.json(edited);
        }catch(e) {
            res.status(400).json('algo deu errado');
            console.log(e)
        }
    }

    static async delete(req, res) {
        try{
            const coment = await ComentModel.findByPk(req.params.id);
            await coment.destroy();

            res.json('everything worked');
        }catch(e){
            console.log(e)
            res.status(400).json('something had stoped due the process');
        }
    }

}