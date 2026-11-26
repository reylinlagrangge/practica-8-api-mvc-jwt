const mongoose = require('mongoose')

// Schema del usuario: define los campos y sus validaciones
const usuarioSchema = new mongoose.Schema({
    // Nombre del usuario (texto obligatorio)
    nombre: { type: String, required: true, trim: true },

    // Email del usuario (obligatorio y único: no se puede repetir)
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Contraseña ya encriptada con bcrypt (nunca en texto plano)
    password: { type: String, required: true }
})

// Se exporta el modelo; Mongoose usará la colección "usuarios"
module.exports = mongoose.model('Usuario', usuarioSchema)
