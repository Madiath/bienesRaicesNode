import {Dropzone} from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').content;  


Dropzone.options.img = {
    dictDefaultMessage: 'Sube tus imagenes aqui',
    acceptedFiles:'.png,.jpg,.jpeg',
    maxFilesize:5,
    maxFiles:1,
    parallelUploads:10,
    autoProcessQueue:false,
    addRemoveLinks:true,
    dictRemoveFile:'Borrar Archivo',
    dictMaxFilesExceeded:'El limite es de un Archivo',
    headers: {
        'CSRF-Token': token
    },
    paramName:'img', //Para conectarlo con el rout le ponemos el mismo nombre
    init: function(){
        const dropzone = this;
        const btnPublicar = document.querySelector('#publicar');

        btnPublicar.addEventListener('click', function(){
            dropzone.processQueue();
        })

        dropzone.on('queuecomplete', function(){
              if(dropzone.getActiveFiles().length == 0){
                window.location.href = '/mis-propiedades' //Cuando termina de procesar todo los archivos lo redireccionamos a sus propiedades, por eso no lo hacemos en el controller
              }
        });
    }
}

