import jwt from 'jsonwebtoken';

//Autenticar al Usuario
const generarJWT = datos => jwt.sign({id: datos.id, nombre: datos.nombre},process.env.JWT_SECRET,{//Confirmacio token
expiresIn:'1d' //Opciones token, expiracion
});
    


//Generar un token comun
const generarId = () => Math.random().toString(32).substring(2) +  Date.now().toString(32); 

export{
    generarJWT,
    generarId
};