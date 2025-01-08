import { comparePassword } from "@/utils/types.js";
import { compareSync, hashSync } from "bcrypt-ts";

export default class CypherController {
    static hashPassword(password : string) {
        return hashSync(password, 10);
    }

    static comparePassword({password, hash} : comparePassword) {

        return compareSync(password, hash);
    }
}