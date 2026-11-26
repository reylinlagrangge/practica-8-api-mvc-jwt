const Producto = require('../models/Producto')

// Verifica que vengan los tres campos obligatorios en el cuerpo de la petición
function faltanCampos(nombre, descripcion, precio) {
    return !nombre || !descripcion || precio === undefined || precio === null || precio === ''
}

// Responde según el tipo de error de Mongoose
function manejarError(error, res) {
    // Id con formato inválido o precio que no es un número
    if (error.name === 'CastError') {
        return res.status(400).json({ mensaje: 'Id no valido o dato con formato incorrecto' })
    }
    // Falló alguna validación del schema (campo faltante o precio negativo)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ mensaje: error.message })
    }
    // Cualquier otro error inesperado
    console.error(error)
    res.status(500).json({ mensaje: 'Error del servidor' })
}

// GET - Listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
        res.json(productos)
    } catch (error) {
        manejarError(error, res)
    }
}

// GET - Obtener un producto por id
const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)

        // Si no existe, se responde 404
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

        res.json(producto)
    } catch (error) {
        manejarError(error, res)
    }
}

// POST - Crear un producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body

        // Los tres campos son obligatorios (400 si falta alguno)
        if (faltanCampos(nombre, descripcion, precio)) {
            return res.status(400).json({
                mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
            })
        }

        // Se guarda en MongoDB; el _id lo genera la base de datos
        const nuevoProducto = await Producto.create({ nombre, descripcion, precio })

        res.status(201).json(nuevoProducto)
    } catch (error) {
        manejarError(error, res)
    }
}

// PUT - Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body

        // Los tres campos son obligatorios (400 si falta alguno)
        if (faltanCampos(nombre, descripcion, precio)) {
            return res.status(400).json({
                mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
            })
        }

        // returnDocument: 'after' devuelve el producto ya actualizado
        // runValidators: true aplica las validaciones del schema al actualizar
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precio },
            { returnDocument: 'after', runValidators: true }
        )

        // Si no existe, se responde 404
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

        res.status(200).json(productoActualizado)
    } catch (error) {
        manejarError(error, res)
    }
}

// DELETE - Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id)

        // Si no existe, se responde 404
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

        res.status(200).json({
            mensaje: 'Producto eliminado',
            producto: productoEliminado
        })
    } catch (error) {
        manejarError(error, res)
    }
}

module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
