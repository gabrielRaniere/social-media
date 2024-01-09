import env from 'dotenv';
env.config();

import { Router } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const route  = new Router();

const comparePass = async (pass, hash) => {
    const flag = await bcrypt.compare(pass, hash);
    return flag;
};

route.post('/', async (req, res) => {
    try{

        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json('envie as informações !');

        const user = await UserModel.findOne({
            where: {email}
        })

        const passTrue = await comparePass(password, user.password_hash);

        if(!passTrue) return res.status(400).json('senhas não convergem...');


        const token = jwt.sign({}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });

        res.json({
            token,
            data: user
        });

    }catch(e) {
        console.log(e);
        res.status(400).json('deu erro');
    }
});

export default route;


