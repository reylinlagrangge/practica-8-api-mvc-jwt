const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

// POST /auth/registro - Registrar un usuario nuevo
const registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body

        // Los tres campos son obligatorios (400 si falta alguno)
        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'Los campos nombre, email y password son obligatorios'
            })
        }

        // Si ya existe un usuario con ese email, se responde 409
        const existente = await Usuario.findOne({ email: email.toLowerCase().trim() })
        if (existente) {
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email' })
        }

        // La contraseña se encripta antes de guardarla
        const passwordEncriptada = await bcrypt.hash(password, 10)

        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordEncriptada
        })

        // Se responde con 201 y los datos SIN la contraseña
        res.status(201).json({
            mensaje: 'Usuario registrado',
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })
    } catch (error) {
        // Email repetido detectado por el índice único de MongoDB
        if (error.code === 11000) {
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email' })
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensaje: error.message })
        }
        console.error(error)
        res.status(500).json({ mensaje: 'Error del servidor' })
    }
}

// POST /auth/login - Iniciar sesión y recibir el token
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Email y password son obligatorios (400 si falta alguno)
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Los campos email y password son obligatorios' })
        }

        // Se busca el usuario por su email
        const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() })

        // Si el email no existe, se responde 401 con el mismo mensaje que una clave incorrecta
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' })
        }

        // Se compara la contraseña escrita con la encriptada
        const coincide = await bcrypt.compare(password, usuario.password)
        if (!coincide) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' })
        }

        // Se genera el token con el id del usuario; expira en 1 hora
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // Se responde con 200, el token y los datos SIN la contraseña
        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error del servidor' })
    }
}

module.exports = { registro, login }
