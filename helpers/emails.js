import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

 const {nombre, email, token} = datos;

 //Enviar el Email
 await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirma tu cuenta en BienesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html:`<p>Hola ${nombre}, comprueba tu cuenta en BienesRaices.com</p>
    
    <p>Tu cuenta ya esta lista, solo tienes que confirmarla dandole click al siguiente enlace: 
    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu cuenta</a></p>

    <p>Sí tu no creaste esta cuenta, ignora este mensaje</p>
    `
 })

}

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
   const {nombre, email, token} = datos;
  
   //Enviar el Email
   await transport.sendMail({
      from: 'BienesRaices.com',
      to: email,
      subject: 'Restablece tu password en BienesRaices.com',
      text: 'Restablece tu password en BienesRaices.com',
      html:`<p>Hola ${nombre}, has solicitado reestablecer tu paswordd en BienesRaices.com</p>
      
      <p>Sigue el siguiente enlace para restablecer tu password: 
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">
      Reestablecer Password</a></p>
  
      <p>Sí tu no solicitaste cambio de Password, ignora este mensaje</p>
      `
   })
  
  }
  





export {
emailRegistro,
emailOlvidePassword
}