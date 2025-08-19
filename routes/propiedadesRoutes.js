import express from "express";
import {body} from "express-validator";
import {admin,crear,guardar, agregarImagen, almacenarImagen, editar,guardarCambios, eliminar, 
mostrarPropiedad, enviarMensaje, verMensajes, cambiarEstado} from "../controllers/propiedadController.js";
import protejerRuta from "../middleware/protejerRuta.js";
import upload from "../middleware/subirImagen.js";
import identificarUsuario from "../middleware/identificarUsuario.js";

const router = express.Router();
//Ver las propiedades
router.get('/mis-propiedades', protejerRuta, admin);

//Obtener formulario para crear propiedad y mandar solicitud
router.get('/propiedades/crear', protejerRuta, crear);
router.post('/propiedades/crear', protejerRuta, 
body('titulo').notEmpty().withMessage('El titulo del anuncio es Obligatorio'),
body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia')
.isLength({max:200}).withMessage('La descripcion es muy larga'),
body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estacionamientos'),
body('wc').isNumeric().withMessage('Selecciona la cantidad de Baños'),
body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
guardar
);

//Mandar obtener dropzone y envio de imagen
router.get('/propiedades/agregar-imagen/:id', protejerRuta ,agregarImagen);
router.post('/propiedades/agregar-imagen/:id',
    protejerRuta,
    //Cargar una imagen 'single' soportar muchas 'array'
    upload.single('img'),
    almacenarImagen
)


//Obtener formulario para editar propiedad
router.get('/propiedades/editar/:id', protejerRuta, editar);
router.post('/propiedades/editar/:id', protejerRuta, 
body('titulo').notEmpty().withMessage('El titulo del anuncio es Obligatorio'),
body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia')
.isLength({max:200}).withMessage('La descripcion es muy larga'),
body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estacionamientos'),
body('wc').isNumeric().withMessage('Selecciona la cantidad de Baños'),
body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
guardarCambios
);

//Eliminar propiedad
router.post('/propiedades/eliminar/:id', 
    protejerRuta,
    eliminar
);

router.put('/propiedades/:id',
    protejerRuta, 
    cambiarEstado
);





//Area Publica osea que no vamos a protejer la ruta y cualquier usuario tiene acceso a ella. 
router.get('/propiedad/:id' ,
identificarUsuario, 
mostrarPropiedad);


//Donde vamos almacenar los mensajes
router.post('/propiedad/:id' ,
identificarUsuario,
body('mensaje').isLength({min:20}).withMessage('El mensaje no puede ir vacio o es muy corto'), 
enviarMensaje);


router.get('/mensajes/:id',
    protejerRuta,
    verMensajes
)


export default router;