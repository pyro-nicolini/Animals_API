# <p style="text-align: center">¡Bienvenido!</p>

## Node.js CRUD & Authentication Project

Este proyecto fue realizado como un ejercicio práctico para aprender y comprender los conceptos fundamentales de Node.js, autenticación de usuarios, y la integración de MongoDB. También se exploró cómo implementar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos, permitiendo una experiencia completa para el manejo de usuarios dentro de una aplicación.


El proyecto cuenta con una interfaz de registro y login, así como una sección para gestionar un listado de animales, utilizando los principios de autenticación.

## Tecnologías Utilizadas 🔨🔨

**Node.js**: Plataforma de desarrollo para el backend.
**Express.js**: Framework minimalista para crear servidores web con Node.js.
**MongoDB**: Base de datos NoSQL para almacenar los datos de los usuarios y otros datos del proyecto.
**Mongoose**: ODM para facilitar la interacción entre Node.js y MongoDB.
**bcryptjs**: Biblioteca para cifrar las contraseñas de los usuarios.
**dotenv**: Manejo de variables de entorno para proteger información sensible como la URL de MongoDB.

## Imágenes del Proyecto

Pantalla de Login
https://github.com/pyro-nicolini/Animals_API/blob/main/img/login.jpg

Pantalla de Registro
https://github.com/pyro-nicolini/Animals_API/blob/main/img/register.jpg

Pantalla de Gestión de Animales
https://github.com/pyro-nicolini/Animals_API/blob/main/img/animal.jpg

Evidencia de la respuesta en el servidor
https://github.com/pyro-nicolini/Animals_API/blob/main/img/mongodb.jpg


## Paso a Paso: Cómo Ejecutar el Proyecto

1.- Crear base de datos en MongoDB
Crea una base de datos en MongoDB y genera un vínculo de conexión (URL de MongoDB Atlas o una base de datos local).

2.- Pegar el link de MongoDB en el archivo .env
En el archivo .env, agrega la URL de tu base de datos de MongoDB, utilizando la clave MONGO_URI.

Ejemplo:
MONGODB_URI=mongodb+srv://_YOUR_ACCOUNT_:_YOUR_PASSWORD@cluster0.diusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000

3.- Asignar una clave secreta para las sesiones
En el terminal (bash), define una clave secreta para tu aplicación. Esto será utilizado por Express-session para manejar sesiones de usuario de manera segura.

Ejemplo:
bash

$env:SECRET="mi-secreto"

4.- Ejecutar el proyecto
Luego, corre el siguiente comando en el terminal para iniciar el servidor:

bash
node main.js

5.- Disfruta el Proyecto
Abre tu navegador y ve a http://localhost:3000 para probar la aplicación. 


## ¡Disfruta!
