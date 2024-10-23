
/** RECORDAR USAR   $env:SECRET="mi-secreto"  EN EL BASH   */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Requiere dotenv
const app = express();
const Animal = require('./animal.controller'); // Asegúrate de que este archivo exista
const { Auth, isAuthenticated } = require('./auth.controller'); // Asegúrate de que este archivo exista

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const port = process.env.PORT || 3000;

/** TU CONEXIÓN CON MONGO DB AQUÍ  */
mongoose.connect(process.env.MONGODB_URI) // Usa la URI desde .env
    // Manejo de errores si la conexión falla
    .then(() => console.log("Conectado a MongoDB")) // Mensaje de éxito si la conexión es correcta
    .catch(err => console.error("Error al conectar a MongoDB:", err)); // Manejo de errores si la conexión falla

app.use(express.json());

// Agrega estas líneas para la ruta de '/' y para archivos estáticos
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`); // Asegúrate de que el archivo esté aquí
});

app.use(express.static('app')); // Sirve archivos estáticos desde la carpeta 'app'

// Rutas de animales
app.get('/animals', isAuthenticated, Animal.list);
app.post('/animals', isAuthenticated, Animal.create);
app.put('/animals/:id', isAuthenticated, Animal.update);
app.patch('/animals/:id', isAuthenticated, Animal.update);
app.delete('/animals/:id', isAuthenticated, Animal.destroy);

// Rutas de autenticación
app.post('/login', Auth.login);
app.post('/register', Auth.register);

// Manejo de rutas no encontradas
app.get('*', (req, res) => {
  res.status(404).send('Nothing to show you :(');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log('Launching the app!');
});

app.get('/test', (req, res) => {
    res.sendFile(`${__dirname}/test.html`);
});
