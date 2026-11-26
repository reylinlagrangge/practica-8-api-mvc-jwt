const jwt = require('jsonwebtoken')

// Middleware que verifica el token JWT del encabezado Authorization
const verificarToken = (req, res, next) => {
    const encabezado = req.headers.authorization

    // El encabezado debe existir y tener el formato "Bearer TOKEN"
    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Falta el token de autenticacion' })
    }

    // Se extrae el token quitando la palabra "Bearer "
    const token = encabezado.split(' ')[1]

    try {
        // Si el token es válido, se guardan sus datos en req.usuario
        const datos = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = datos

        // Se continúa hacia el controlador
        next()
    } catch (error) {
        // Token alterado, inválido o expirado
        res.status(401).json({ mensaje: 'Token invalido o expirado' })
    }
}

module.exports = verificarToken
