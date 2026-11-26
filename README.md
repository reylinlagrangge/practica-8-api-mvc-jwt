# Práctica 8 - API de productos con MVC y JWT

API REST de productos hecha con Express y Mongoose, conectada a MongoDB Atlas. Usa arquitectura MVC y autenticación con JWT: crear, actualizar y eliminar productos requiere iniciar sesión.

## Estructura

```
app.js              configura Express, conecta a MongoDB y monta las rutas
models/             Producto.js y Usuario.js
controllers/        productoController.js y authController.js
routes/             productoRoutes.js y authRoutes.js
middlewares/        auth.js (verifica el token JWT)
```

## Cómo ejecutar

1. Instalar dependencias:

```
npm install
```

2. Crear un archivo `.env` en la raíz con estas variables (usa tus propios valores):

```
MONGODB_URI=tu_cadena_de_conexion_de_mongodb_atlas
PORT=3000
JWT_SECRET=una_clave_larga_y_dificil_de_adivinar
```

3. Iniciar el servidor:

```
npm start
```

El servidor corre en http://localhost:3000

## Endpoints

| Método | Ruta | Descripción | Acceso | Respuestas |
|--------|------|-------------|--------|------------|
| POST | /auth/registro | Registra un usuario | Público | 201, 400, 409 |
| POST | /auth/login | Inicia sesión y devuelve el token | Público | 200, 400, 401 |
| GET | /productos | Lista todos los productos | Público | 200 |
| GET | /productos/:id | Obtiene un producto por id | Público | 200, 400, 404 |
| POST | /productos | Crea un producto | Requiere token | 201, 400, 401 |
| PUT | /productos/:id | Actualiza un producto | Requiere token | 200, 400, 401, 404 |
| DELETE | /productos/:id | Elimina un producto | Requiere token | 200, 400, 401, 404 |

Para las rutas protegidas se envía el encabezado `Authorization: Bearer TU_TOKEN`.