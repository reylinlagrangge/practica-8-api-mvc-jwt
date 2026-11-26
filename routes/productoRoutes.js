const express = require('express')
const router = express.Router()
const verificarToken = require('../middlewares/auth')
const {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController')

// Rutas públicas (no requieren token)
router.get('/', listarProductos)
router.get('/:id', obtenerProducto)

// Rutas protegidas: el middleware verifica el token antes del controlador
router.post('/', verificarToken, crearProducto)
router.put('/:id', verificarToken, actualizarProducto)
router.delete('/:id', verificarToken, eliminarProducto)

module.exports = router
