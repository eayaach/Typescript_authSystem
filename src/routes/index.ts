// User registration
// User email verification
// Forgot password
// Reset password
// Get current user
// User login
// Access token
// Refresh tokens
// Notamos que necesitamos cada una de estas rutas para que nuestro sistema de autenticación funcione correctamente.

import express, { Router } from 'express';
const router: Router = express.Router();

// Aquí definiremos las rutas más adelante
router.get('/healthcheck', (_, res) => {
    res.sendStatus(200);
})

export default router;