import configuredMulter from '../../config/multer';
import FotoPerfilModel from '../models/fotoPerfil';

const upload = configuredMulter.single('fotoPerfil');

export default class FotoPerfil {
    static store(req, res) {
        try{
            upload(req, res, async (err) => {
                if(err) {
                    console.log(err)
                    res.status(400).json('algo deu errado no multer...');
                }

                const {filename} = req.file;

                const foto = await FotoPerfilModel.create({
                    fileName: filename,
                    user_id: req.body.user_id
                })


                res.json(foto);
            })
        }catch(e) {
            res.status(400).json('algo deu errado');
            console.log(e);
        }
    }

    static async delete(req, res) {
        try{
            const fotoPerfil = await FotoPerfilModel.findOne({
                where: {
                    user_id: req.params.id
                }
            });
            fotoPerfil.destroy();
            res.json('ok');
        }catch(e) {
            console.log(e);
            res.status(400).json('algo deu errado');
        }
    }
}