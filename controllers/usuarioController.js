import {check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import {generarJWT,generarId} from '../helpers/tokens.js'
import {emailRegistro, emailOlvidePassword} from '../helpers/emails.js'
import Usuario from '../models/Usuario.js';


const formularioLogin = (req, res) => {
    res.render('auth/login',{
     pagina:'Inicia Sesión',
     csrfToken: req.csrfToken()
      })
}

const autenticar = async (req, res) => {
//Validacion 

await check('email').isEmail().withMessage('El Email es Obligatorio').run(req);
await check('password').notEmpty().withMessage('El Password es Obligatorio').run(req);

let resultado = validationResult(req);



//Verificar que el resultado este vacio

if(!resultado.isEmpty()){
//Errores
return res.render('auth/login',{
    pagina: 'Iniciar Sesión',
    csrfToken: req.csrfToken(),
    errores: resultado.array()
     })
}


const {email, password} = req.body;

//Comprobar sí el usuario existe

const usuario = await Usuario.findOne({where : {email}});

if(!usuario){
    return res.render('auth/login',{
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken(),
        errores: [{msg: 'El Usuario No Existe'}]
         })
}

//Comprobar sí el usuario esta confirmado
if(!usuario.confirmado){
    return res.render('auth/login',{
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken(),
        errores: [{msg: 'No has confirmado aun tu cuenta'}]
         })
}

//Comprobar la password
if(!usuario.verificarPassword(password)){
    return res.render('auth/login',{
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken(),
        errores: [{msg: 'El Password es Incorrecto'}]
         })
}

//Autenticar al Usuario
const token = generarJWT({id:usuario.id,nombre:usuario.nombre});

return res.cookie('_token', token,{
    httpOnly: true, // Esto evita los ataques cross site, esto hace que un cookie no sea accesible desde la api js
   // secure: true //Permite cookies en conexiones seguras pero como no tenemos ssl lo dejamos comentado
   //sameSite: true //Misma historia ssl
}).redirect('/mis-propiedades');

}

const cerrarSesion = (req, res) => {
   return res.clearCookie('_token').status(200).redirect('/auth/login');
}



const formularioRegistro = (req, res) => {
    res.render('auth/registro',{
     pagina: 'Crear Cuenta',
     csrfToken: req.csrfToken()

      })
}

const registrar = async(req, res) => 
    {
//Validacion
await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req);
await check('email').isEmail().withMessage('Eso no parece un email').run(req);
await check('password').isLength({min: 6}).withMessage('El password debe ser de almenos 6 caracteres').run(req);
await check('repetir_password').equals(req.body.password).withMessage('Los Passwords no son iguales').run(req);

let resultado = validationResult(req);



//Verificar que el resultado este vacio

if(!resultado.isEmpty()){
//Errores
return res.render('auth/registro',{
    pagina: 'Crear Cuenta',
    csrfToken: req.csrfToken(),
    errores: resultado.array(),
    usuario: {
        nombre: req.body.nombre,
        email: req.body.email
    }
     })
}

//Extraer los datos
const {nombre, email, password} = req.body;
//Verificar sí existe Usuario
const existeUsuario = await Usuario.findOne({ where: { email : email } });


if(existeUsuario)//En caso de existir, no creamos al usuario y lo redireccionamos a la misma vista con error
{
    return res.render('auth/registro',{
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken(),
        errores: [{msg: 'El Usuario ya esta registrado'}], //Generar un arreglo 'al vuelo'
        usuario: {
            nombre: req.body.nombre,
            email: req.body.email
        }
         })
}

//Creamos el usuario si no se cumple el if
const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token:generarId()
})

//Envia email de confirmacion
emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
})

//Mostrar mensaje de confirmacion
res.render('templates/mensaje',{
    pagina: 'Cuenta Creada Correctamente',
    mensaje: 'Hemos Enviado un Email de Confirmacion, presiona el enlace'
})

}


//Funcion que comprueba una cuenta
const confirmar = async (req, res) =>{

const {token} = req.params; //Para leer el token que esta siendo enviado como parametro en el root

//Verificar sí el token es valido 

const usuario = await Usuario.findOne({where : {token}}) //Puedo poner solo token ya que la columna de la tabla Usuario se llama igual

if(!usuario)
{
   return res.render('auth/confirmar-cuenta', {
    pagina: 'Error al confirmar tu cuenta',
    mensaje: 'Hubo un error al confirmar tu cuenta, intentalo de nuevo',
    error: true     
   })
}
//Confirmar la cuenta
 usuario.token = null;
 usuario.confirmado = true;
 await usuario.save();


 res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta Confirmada',
    mensaje: 'La Cuenta ya esta Lista para Usar',
    error: false     
   })
}





const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password',{
   pagina: 'Recupera tu acceso a Bienes Raices',
   csrfToken: req.csrfToken()
    })
}


const resetPassword =async (req, res) => 
{
 //Validacion
await check('email').isEmail().withMessage('Eso no parece un email').run(req);

let resultado = validationResult(req);

//Verificar que el resultado este vacio

if(!resultado.isEmpty()){
//Errores
return res.render('auth/olvide-password',{
    pagina: 'Recupera tu acceso a Bienes Raices',
    csrfToken: req.csrfToken(),
    errores: resultado.array()
    })
} 

//Buscar al usuario
const { email } = req.body;
const usuario = await Usuario.findOne({ where : { email}});


if(!usuario){
    return res.render('auth/olvide-password',{
        pagina: 'Recupera tu acceso a Bienes Raices',
        csrfToken: req.csrfToken(),
        errores: [{msg:'El Email no Pertenece a ningún Usuario'}]
        })
}


//Generar un token y enviar el email
usuario.token = generarId();
await usuario.save();

//Enviar un email
emailOlvidePassword({
email: usuario.email,
nombre: usuario.nombre,
token: usuario.token
});

//Renderizar un mensaje
res.render('templates/mensaje',{
    pagina: 'Reestablece tu Password',
    mensaje: 'Hemos Enviado un email con las instrucciones'
})
}

const comprobarToken = async (req, res) =>{
const { token } = req.params;

const usuario = await Usuario.findOne({where : {token}});

if(!usuario){
    return res.render('auth/confirmar-cuenta', {
     pagina: 'Restablece tu Password',
     mensaje: 'Hubo un error al validar tu informacion, intenta denuevo',
     error: true     
    })
}

//En caso de que sea valido redireccionarlo a un formulario para restablecer la password
res.render('auth/reset-password', {
    pagina:'Reestablece tu password',
    csrfToken: req.csrfToken()
});


}


const nuevoPassword = async (req, res) =>{
//Validar el Password
await check('password').isLength({min: 6}).withMessage('El password debe ser de almenos 6 caracteres').run(req);
let resultado = validationResult(req);



//Verificar que el resultado este vacio

if(!resultado.isEmpty()){
//Errores
return res.render('auth/reset-password',{
    pagina: 'Reestablece tu password',
    csrfToken: req.csrfToken(),
    errores: resultado.array(),
     })
    }


const { token } = req.params;     
const { password } = req.body;
//Identificar quien hace el cambio
const usuario = await Usuario.findOne({where : {token}})
//Hashear el nuevo password
const salt = await bcrypt.genSalt(10); //Para 'condimentar el hash'
usuario.password = await bcrypt.hash(password, salt);
usuario.token = null;

await usuario.save();

res.render('auth/confirmar-cuenta',{
    pagina:'Password Reestablecido',
    mensaje:'El Password se guardó correctamente'
})

}

export
{
    formularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
    confirmar,
    resetPassword,
    comprobarToken,
    nuevoPassword
}