import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import db from '../config/db.js';


const Usuario = db.define('usuarios', //Define la tabla usuarios en mysql
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false //Quiere decir que este campo no puede ser vacio 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING
        },
        confirmado: {
            type:DataTypes.BOOLEAN
        }
    },{
        hooks: {
            beforeCreate: async function(usuario) // Despues de que se haya creado el usuario
            {
                const salt = await bcrypt.genSalt(10); //Para 'condimentar el hash'
                usuario.password = await bcrypt.hash(usuario.password, salt);  //Hashear password
            }
        },
        scopes:{
            eliminarPassword:{
                attributes: {
                    exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
                }
            }
        }
    })

    //Métodos Personalizados
    Usuario.prototype.verificarPassword = function(password){
       return bcrypt.compareSync(password, this.password);
    }
    export default Usuario;


