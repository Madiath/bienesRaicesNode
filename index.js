import express from 'express'; //Dependencias no requieren la extencion
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js' //Archivos que tu creas requieren la extencion osea toda la fuente del archivo
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';


//crear la app o iniciar la app
const app = express(); //Y aqui mandamos llamar a esa funcion y lo vamos a asignar a app


//habilitar lectura de datos de formulario
app.use(express.urlencoded({extended:true}));


//Habilitar cookie-parser
app.use(cookieParser());

//Habilitar csrf
app.use(csrf({cookie : true}));



//Conexion a la base de datos
try
{
  await db.authenticate();
  db.sync(); //Crea las tablas
  console.log('Conexion correcta a la base de datos');
}
catch(error)
{
    console.log(error);
}




//Habilitar pug
app.set('view engine', 'pug');//Que tipo de view engine cual queremos usar con express
app.set('views', './views')//Donde vas a guardar esos archivos de pug


// Carpeta Pública 
app.use(express.static('public'));



//Routing
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);



//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;

app.listen(port,() =>{ //Aqui le estamos pidiendo que escuche en el puerto y que con un arrow function un back osea que nos devuelva algo sí funciono correctamente. 
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});