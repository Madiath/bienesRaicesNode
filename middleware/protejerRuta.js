import jwt from 'jsonwebtoken';
import {Usuario} from '../models/relaciones.js';


const protejerRuta = async (req, res, next) =>{
//Verificar sí hay un token
 const {_token}= req.cookies;
if (!_token) {
    return res.redirect('/auth/login');
}


//Comprobar token
try {
    
const des = jwt.verify(_token, process.env.JWT_SECRET);
const usuario = await Usuario.scope('eliminarPassword').findByPk(des.id);

//Almacenar al usuario al request

if (usuario) {
    req.usuario = usuario;
}
else{
    res.redirect('/auth/login');
}

return next(); //va al siguiente middlewire osea la siguiente funcion de paso

} catch (error) {
    return res.clearCookie('_token').redirect('/auth/login');
}
 
}

export default protejerRuta;