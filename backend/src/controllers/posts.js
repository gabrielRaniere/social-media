import PostModel from '../models/Post';
import multerConfigured from '../../config/multer';
import User from '../models/User';
import Coment from '../models/Coment';
import FotoPerfil from '../models/fotoPerfil';
import Like from '../models/Like';

const upload = multerConfigured.single('post');

export default class PostController {
    static create(req, res) {
        try{
            upload(req, res, async (err) => {
                if(err) return res.status(400).json('multer deu errado');
                
                console.log(req.body)
                const {filename} = req.file;

                const obj = {...req.body, filename}

                const post = await PostModel.create(obj);

                res.json(post);
            })
        }catch(e) {
            res.status(400).json('algo deu errado');
            console.log(e);
        }   
    }

    static async delete(req, res) {
        try{
            const {id} = req.params;

            const post = await PostModel.findByPk(id);

            if(!post) return res.status(404).json('post não encontrado');

            await PostModel.destroy({where: {
                id: id
            }});

            res.json('post excluído com sucesso !');

        }catch(err) {
            console.log(err);
            res.json('algo deu errado');
        }
    }


    static async index(req, res) {
        try {
            const posts = await PostModel.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    {model: User,
                    include: FotoPerfil},
                    {model: Coment,
                    attributes: ['id', 'message', 'post_id', 'user_id', 'createdAt'],
                    include: [
                        {model: User,
                        include: FotoPerfil}
                    ],
                },
                {model: Like,
                attributes: ['use_id']},
                ],
            })

            res.json(posts);
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }


    static async show(req, res) {
        try{
            const {id} = req.params;

            const post = await PostModel.findByPk(id, {
                include: [
                    {model: User,
                    include: FotoPerfil},
                    {model: Coment,
                    attributes: ['id', 'message', 'post_id', 'user_id', 'createdAt'],
                    include: [
                        {model: User,
                        include: FotoPerfil}
                    ],
                },
                ]
            });

            if(!post) return res.status(404).json('post not found');

            res.json(post)

        }catch(e) {
            res.status(400).json('algo deu errado');
            console.log(e);
        }
    }

    static async update(req, res) {
        try{
            const {use_id} = req.body;
            if(use_id) return res.status(400).json('user_id não deve ser mechido..');

            const post = await PostModel.findByPk(req.params.id);

            console.log(post)

            const editedPost = await post.update({
                ...req.body,
                filename: post.img.split('/').pop()
            });

            res.json(editedPost);

        }catch(e){
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }
}