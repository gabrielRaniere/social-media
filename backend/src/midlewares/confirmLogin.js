import env from 'dotenv';
env.config();
import jwt from 'jsonwebtoken';

export default function confirmLogin(req, res, next) {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json('login required !');

    const token = authorization.slice(7);

    const verify = jwt.verify(token, process.env.TOKEN_SECRET)

    if(!verify) return res.status(401).json('token invalido ou expirado!')

    next();
}