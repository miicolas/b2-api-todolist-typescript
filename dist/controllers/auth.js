var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import CypherController from "./cypher.js";
const prisma = new PrismaClient();
export default class AuthController {
    static register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, hash, name }) {
            if (!name || !hash || !email) {
                throw new Error("Missing required fields");
            }
            const user = yield prisma.user.create({
                data: {
                    email,
                    password: hash,
                    name
                }
            });
            return user;
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined");
                }
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            }
            catch (error) {
                throw new Error("Invalid token");
            }
        });
    }
    static login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield prisma.user.findUnique({
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
        });
    }
}
//# sourceMappingURL=auth.js.map