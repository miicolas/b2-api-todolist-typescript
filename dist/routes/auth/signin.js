var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import AuthController from '../../controllers/auth.js';
// Fonction de connexion
export default function Route_Signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Récupération de la requête
            const { email, password } = req.body;
            // Vérification de l'existance de l'email et du mot de passe
            if (!email || !password) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            // Récupération de l'utilisateur
            const user = yield AuthController.login({ email, password });
            // Vérification de l'existance de l'utilisateur
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials!" });
            }
            // Vérificatino de l'existance du JWT_SECRET
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            // Création d'un TOKEN valable 24h
            const token = jwt.sign({ id: user.user.id, email: user.user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            // Revoie un message de succès
            return res.status(200).json({
                message: "Login successful!",
                data: { token },
            });
        }
        catch (error) {
            // Renvoie d'erreur
            console.error('Login error:', error);
            return res.status(500).json({
                message: "Login failed!",
                error: error.message,
            });
        }
    });
}
//# sourceMappingURL=signin.js.map