import multer from 'multer';
import {resolve, extname} from 'path';

const randomNumber = () => Math.floor(Math.random() * 1000);

const store = multer.diskStorage({
    destination: (req, file, cb)  => {
        cb(null, resolve(__dirname, '..', 'uploads', 'imgs'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_arquive${randomNumber()}.${extname(file.originalname)}`)
    }
})

export default multer(
    {
        storage: store,

        fileFilter: (req, file, cb) => {
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            }else {
                cb(new multer.MulterError('só é permitido arquivos JPEG ou PNG'));
            }
        },
        
    }
    );
