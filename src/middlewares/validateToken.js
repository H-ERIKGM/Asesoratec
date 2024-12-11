import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  const token = req.cookies.token; // Obtén el token desde las cookies
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Agrega el usuario verificado al objeto de solicitud
      next();
  } catch (error) {
      res.status(400).json({ message: 'Token no válido' });
  }

}