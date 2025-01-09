import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export default function AuthMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded.id;
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        console.log(req.user, 'req.user');
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=auth.js.map