// Imports
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Configuration du .env
config();

// Middleware d'authentification
export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): any {
    // Récupération du TOKEN
    const token = req.headers.authorization?.split(' ')[1];

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Vérification de l'existance d'un id dans le TOKEN
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded.id as string;
        } else {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        next();

    } catch (error) {
        // Renvoie d'erreur
        return res.status(401).json({ message: "Invalid token" });
    }
}