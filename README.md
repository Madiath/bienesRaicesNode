# 🏡 Bienes Raíces MVC

Proyecto desarrollado en **Node.js** con arquitectura **MVC**, utilizando **Express**, **Sequelize**, **Pug**, **TailwindCSS** y **Webpack**.  
Incluye configuración de base de datos, autenticación con JWT, manejo de archivos y envío de correos con Nodemailer.

---

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada LTS)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Una base de datos MySQL configurada

---

## 📦 Instalación

1. Descarga o clona este proyecto en tu máquina.  
2. Abre una terminal en la carpeta del proyecto y ejecuta:
npm install || npm i

⚙️ Configuración

El proyecto utiliza variables de entorno.
Debes crear un archivo .env en la raíz del proyecto con el siguiente contenido:
# Configuración Base de Datos
BD_NOMBRE=
BD_USER=
BD_PASS=
BD_HOST=

# Configuración Email
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

# Backend
BACKEND_URL=

# Seguridad
JWT_SECRET=

👉 Completa cada variable con los valores correspondientes a tu entorno.

▶️ Uso
Iniciar el servidor con recarga automática:
npm run server

Compilar TailwindCSS y JS con Webpack (modo observación):
npm run dev

🛠️ Scripts disponibles /package.json

En el archivo package.json encontrarás los siguientes scripts:

npm start → Inicia la app en modo producción.

npm run server → Inicia el servidor con nodemon.

npm run css → Compila TailwindCSS y genera public/css/app.css.

npm run js → Ejecuta Webpack en modo observación.

npm run dev → Corre TailwindCSS y Webpack en paralelo para desarrollo.

npm run db:importar → Importa datos de prueba con seeder.js.

npm run db:eliminar → Elimina los datos importados.


