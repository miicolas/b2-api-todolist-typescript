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
const prisma = new PrismaClient();
export default class TodoController {
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, dueDate, userId }) {
            const todo = yield prisma.todo.create({
                data: {
                    title,
                    description,
                    dueDate,
                    userId
                }
            });
            console.log(todo);
            return todo;
        });
    }
}
//# sourceMappingURL=todo.js.map