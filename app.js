// Se cargan las variables de entorno del archivo .env
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

// Conexión a MongoDB usando la URI guardada en el archivo .env
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error.message))

// Se montan las rutas; la lógica está en controllers/ y routes/
app.use('/auth', require('./routes/authRoutes'))
app.use('/productos', require('./routes/productoRoutes'))

// El puerto sale del archivo .env (3000 por defecto)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
