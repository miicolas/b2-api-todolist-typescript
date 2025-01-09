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
import { PrismaClient } from "@prisma/client";
// Appel de Prisma
const prisma = new PrismaClient();
// Class TodoController
export default class TodoController {
    // Méthode de création de tâches
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, dueDate, userId }) {
            // Si il manque un élément -> renvoi une erreur
            if (!title || !description || !dueDate || !userId) {
                throw new Error("Missing required fields");
            }
            // Création d'une tâche
            const todo = yield prisma.todo.create({
                data: {
                    title,
                    description,
                    dueDate: dueDate ? new Date(dueDate) : undefined,
                    userId
                }
            });
            return todo;
        });
    }
    // Méthode de récupération des tâches
    static getTodos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupération des tâches
                const todos = yield prisma.todo.findMany({
                    where: {
                        userId
                    },
                });
                return todos;
            }
            catch (error) {
                // Renvoie d'erreur
                console.error('Get todos error:', error);
                throw new Error('Get todos failed!');
            }
        });
    }
    static complete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield prisma.todo.findFirst({
                    where: {
                        id: Number(id),
                        userId,
                    }
                });
                if (!todo) {
                    throw new Error('Todo not found!');
                }
                const updatedTodo = yield prisma.todo.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        completed: !todo.completed
                    }
                });
                return updatedTodo;
            }
            catch (error) {
                console.error('Complete todo error:', error);
                throw new Error('Complete todo failed!');
            }
        });
    }
    static delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield prisma.todo.delete({
                    where: {
                        id: Number(id),
                        userId,
                    }
                });
                if (!todo) {
                    throw new Error('Todo not found!');
                }
                return todo;
            }
            catch (error) {
                console.error('Delete todo error:', error);
                throw new Error('Delete todo failed!');
            }
        });
    }
}
//# sourceMappingURL=todo.js.map