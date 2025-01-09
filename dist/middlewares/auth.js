// Imports
import jwt from "jsonwebtoken";
import { config } from "dotenv";
// Configuration du .env
config();
// Middleware d'authentification
export default function AuthMiddleware(req, res, next) {
    var _a;
    // Récupération du TOKEN
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // Vérification de l'existance du TOKEN
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // Vérification de l'existance du JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        // Déchiffrage du TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Vérification de l'existance d'un id dans le TOKEN
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded.id;
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        next();
    }
    catch (error) {
        // Renvoie d'erreur
        return res.status(401).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=auth.js.map