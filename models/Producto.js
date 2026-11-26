const mongoose = require('mongoose')

// Schema del producto: define los campos y sus validaciones
const productoSchema = new mongoose.Schema({
    // Nombre del producto (texto obligatorio)
    nombre: { type: String, required: true },

    // Descripción del producto (texto obligatorio)
    descripcion: { type: String, required: true },

    // Precio del producto (número obligatorio y no negativo)
    precio: { type: Number, required: true, min: 0 }
})

// Se exporta el modelo; Mongoose usará la colección "productos"
module.exports = mongoose.model('Producto', productoSchema)