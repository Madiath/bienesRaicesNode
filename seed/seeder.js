import {exit} from 'node:process';
import categorias from './categorias.js';
import precios from './precios.js';
import usuarios from './usuarios.js';
import {Categoria, Precio,Propiedad, Usuario} from '../models/relaciones.js';
import db from '../config/db.js';

//Metodo para importar datos
const importarDatos = async () =>{
    try{
       // Autenticar
       await db.authenticate();
       // Generar las columnas
       await db.sync();
       // Insertamos los datos en paralelo ya que son modelos idependientes y no tiene que ser secuencial con 2 await 
       // Precio no depende de Categoria
       await Promise.all([
           Categoria.bulkCreate(categorias),
           Precio.bulkCreate(precios),
           Usuario.bulkCreate(usuarios)
       ]);



       console.log('Datos importados');
       exit(0); //Una forma de terminar los procesos o tareas pendientes, es crucial que cierre todo eso
    }
    catch(error){
        console.log(error);
        exit(1); //Terminamos los procesos pero ademas avisamos del error. el 0 o la nada seria como ok
    }
}

//Metodo para eliminar datos
const eliminarDatos = async() => {
try{
  
//await Propiedad.drop();    

    //await Promise.all([
           
        //   Categoria.destroy({where: {}, truncate: true}),
        //   Precio.destroy({where: {}, truncate: true}),
        //   Usuario.destroy({where:{}, truncate: true})
           /*El truncate se pone cuando yo quiero eliminar tambien el id en la db y no solo los datos, osea sí yo tengo 
           10 datos y los elimino.. Cuando vuelva a insertar un dato nuevo no quiero que ese dato empiece con el numero 
           11...Sino denuevo con el 1 */
      // ])

    //Otra forma de eliminar los datos, pero elimina todas tablas osea el contenido. Esto es en el caso que tuvieras muchas pero como son 2
   await db.sync({ force: true });

       console.log("Datos eliminados correctamente");
       exit(0);
}
catch(error){
    console.log(error);
    exit(1);
}
}





//'process' es un proceso interno de node.js y llamamos al metodo argv
//Yo voy a mandar desde la terminal "db:importar" que es un 'arreglo' de comandos y el -i esta en la pos[2]
//Sí esto se cumple se importan los datos 
if(process.argv[2] === "-i"){
    importarDatos();
}

//Para eliminar lo datos 'e' de eliminar y 'i' de importar, le podria poner 1-2
if(process.argv[2] === "-e"){
    eliminarDatos();
}