var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthController from '../../controllers/auth.js';
export default function Route_Me(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            const user = yield AuthController.getUser(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            return res.status(200).json({
                message: "Get user successful!",
                data: user
            });
        }
        catch (error) {
            console.error('Get user error:', error);
            return res.status(500).json({
                message: "Get user failed!",
                error: error.message
            });
        }
    });
}
//# sourceMappingURL=me.js.map