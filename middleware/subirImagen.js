import multer from 'multer';
import path from 'path';
import {generarId} from '../helpers/tokens.js';


const storage = multer.diskStorage({
    destination: function(req, file, cb){ //Donde se guarda
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){ //La carpeta donde el archivo se va almacenar
        cb(null, generarId() + path.extname(file.originalname)); //Utilizamos generarId para que no haya conflicto con archivos del mismo nombre, path te permite leer la ruta y extname te trae la extencion(ej .jpg) osea se guarda con la misma 
    }
});


const upload = multer({storage});

export default upload;







