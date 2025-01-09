// Imports
import { comparePassword } from "@/utils/types.js";
import { compareSync, hashSync } from "bcrypt-ts";

// Class CypherController
export default class CypherController {
    // Méthode de hachement du mot de passe
    static hashPassword(password : string) {
        return hashSync(password, 10);
    }

    // Méthode de comparaison de mot de passe
    static comparePassword({password, hash} : comparePassword) {
        return compareSync(password, hash);
    }
}