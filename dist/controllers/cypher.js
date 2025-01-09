import { compareSync, hashSync } from "bcrypt-ts";
// Class CypherController
export default class CypherController {
    // Méthode de hachement du mot de passe
    static hashPassword(password) {
        return hashSync(password, 10);
    }
    // Méthode de comparaison de mot de passe
    static comparePassword({ password, hash }) {
        return compareSync(password, hash);
    }
}
//# sourceMappingURL=cypher.js.map