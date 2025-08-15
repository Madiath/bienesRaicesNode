import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const identificarUsuario = async (req, res, next) => {
    //Identificar sí hay un token en las cookies
    const {_token} = req.cookies;

    if (!_token) {
        req.usuario = null;
        return next();
    }

    //Comprobar sí el token es valido
    try {
    
const des = jwt.verify(_token, process.env.JWT_SECRET);
const usuario = await Usuario.scope('eliminarPassword').findByPk(des.id);

if(usuario){
    req.usuario = usuario;
}

return next(); 

    } catch (error) {
        console.log(error);
        return res.clearCookie('_token').redirect('/auth/login'); //Limpiamos la cookie por que ya no sirve
    }
}


export default identificarUsuario;
