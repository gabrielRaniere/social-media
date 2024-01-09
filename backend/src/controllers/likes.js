import  Like  from "../models/Like";

export default class LikeController {
    static async create(req, res) {
        try{
            const {use_id, target_post} = req.body;

            if(!use_id || !target_post) return res.status(400).json('envie os atributos');

            const like = await Like.create({
                use_id,
                target_post
            });

            res.json(like)
        }catch(e){
            console.log(e);
            res.status(400).json('something has broken during the process')
        }
    }

    static async remove(req, res) {
        try{
            const {id} = req.params;

            const like = await Like.findOne({
                where: {use_id: id}
            });

            like.destroy();

            res.json('like removed');
        }catch(e){
            console.log(e);
            res.status(400).json('something has broken during the process')
        }
    }
}