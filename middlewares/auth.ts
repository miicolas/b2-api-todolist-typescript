import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

config();

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        if (!process.env.JWT_SECRET) {  
            throw new Error("JWT_SECRET is not defined");
        } 

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded.id as string;
        } else {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}