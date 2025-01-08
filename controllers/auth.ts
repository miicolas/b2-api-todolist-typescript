import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import CypherController from "./cypher.js";
import { RegisterUser, LoginUser } from "../utils/types.js";


const prisma = new PrismaClient();

export default class AuthController {

    static async register({email, hash, name }: RegisterUser) {
        if (!name || !hash || !email) {
            throw new Error("Missing required fields");
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                name
            }
        });

        return user;
    }

    static async verifyToken(token : string) {
        try {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return user;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    static async login({email, password}: LoginUser) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }
        if (!CypherController.comparePassword({ password, hash: user.password })) {
            return null;
        }
        return user;
    }
}