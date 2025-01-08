import { compareSync, hashSync } from "bcrypt-ts";
export default class CypherController {
    static hashPassword(password) {
        return hashSync(password, 10);
    }
    static comparePassword({ password, hash }) {
        return compareSync(password, hash);
    }
}
//# sourceMappingURL=cypher.js.map