import path from 'path'

export default{
    mode: "development", //Le ponemos para que lo vamos a usar, es solo para agregar mas info
    entry:{ //Entrada.. Acá lo procesa
     mapa:'./src/js/mapa.js', //Donde queremos que lo encuentre "El mapa"
     agregarImagen:'./src/js/agregarImagen.js',
     mostrarMapa:'./src/js/mostrarMapa.js',
     mapaInicio:'./src/js/mapaInicio.js'
    },
    output:{ // Salida
      filename: '[name].js',   //El nombre que se va a guardar en nuestro disco duro en nuestro proyecto
      path: path.resolve('public/js') //La ruta donde mandar estos datos
    }
}