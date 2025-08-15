import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER,process.env.BD_PASS, 
    {
        host: process.env.HOST, 
        port: 3306,
        dialect: 'mysql',
        define: {//Esto agrega 2 columnas extras como una especie de auditoria, cuando fue creado y cuando fue actualizado 
            timestamps: true
        },
        /*connection pool:
        Cada ves que yo visito un sitio web,
        por ejemplo, en el nuestro si estoy o requiero
        conectarme a la base de datos se va a crear una 
        coneccion a la base de datos 
        la coneccion a la base de datos es algo que consume 
        muchos recursos entonces este 'connection pool'
        configura como va a ser el comportamiento para conecciones nuevas o 
        existentes , lo que va a tratar de hacer squelize es tratar de mantener 
        las conecciones que esten vivas .. Entonces es por eso que le pasamos este 
        pool de conexion para que en el caso de que haya una conexión viva se 
        siga utilizando y no se cree una nueva
        */
        pool: {
            max: 5,//Maximo de conecciones a mantener, osea no son 5 conecciones por un millon de usuarios sino que cada usuario solo podra realizar 5 
            min: 0,//Minimo de conecciones a mantener, osea cuando no haya actividad pues va atratar de desconectar todas para liberar algunos recursos
            acquire: 30000, // 30 segundos osea 30000 milisegundos para elaborar una conexion antes de marcar un error 
            idle: 10000 // 10 segundos en lo que ve que no hay nada de movimiento , no hay visitas y esta tranquilo entonces le da 10 para que la conexion se finalize
        },
        operatorsAliases: false //Esto es algo que tenia sequelize pero ahora es obsoleto por las dudas lo marcamos como falso, ya no van a ser necesarios
    })

    export default db;