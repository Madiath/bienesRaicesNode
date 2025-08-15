import bycript from 'bcrypt';

const usuarios = [
  {
    nombre: "diego",
    email: "diego@gmail.com",
    confirmado: 1,
    password: bycript.hashSync("diego.1", 10) ,
  },
  {
    nombre: "marcos",
    email: "marcos@gmail.com",
    confirmado: 1,
    password: bycript.hashSync("marcos.1", 10) ,
  }  
];



export default usuarios;