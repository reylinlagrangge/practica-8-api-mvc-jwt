const express = require('express')
const router = express.Router()
const { registro, login } = require('../controllers/authController')

// Rutas públicas de autenticación
router.post('/registro', registro)
router.post('/login', login)

module.exports = router
