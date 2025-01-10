var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import AuthController from "../../controllers/auth.js";
import CypherController from "../../controllers/cypher.js";
// Fonction de création de compte
export default function Route_Signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Récupération de la requête
            const { email, password, name } = req.body;
            // Vérification de l'existance du mot de passe, de l'email et du name
            if (!password || !email || !name) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            // Vérification de la longueur du mot de passe
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long!" });
            }
            // Hachement du mot du passe
            const hash = CypherController.hashPassword(password);
            // Vérification du hachement
            if (!hash) {
                return res.status(500).json({ message: "Failed to hash password!" });
            }
            // Création de l'utilisateur
            const user = yield AuthController.register({ email, hash, name });
            console.log(user);
            // Renvoie un message de succès
            return res.status(201).json({
                message: "Register successful!",
                data: user
            });
        }
        catch (error) {
            // Renvoie d'erreur
            console.error('Registration error:', error);
            return res.status(500).json({
                message: "Registration failed!",
                error: error.message
            });
        }
    });
}
//# sourceMappingURL=signup.js.map