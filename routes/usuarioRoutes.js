import express from "express";
import { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword, confirmar, resetPassword, comprobarToken, nuevoPassword ,autenticar, cerrarSesion} from "../controllers/usuarioController.js";


const router = express.Router();

//Routing 
//login
router.get('/login',formularioLogin);
router.post('/login',autenticar);

//Cerrar sesión
router.post('/cerrar-sesion', cerrarSesion);

//registro
router.get('/registro',formularioRegistro);
router.post('/registro',registrar);
router.get('/confirmar/:token',confirmar);
//olvide password
router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);




    export default router