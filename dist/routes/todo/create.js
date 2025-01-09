var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TodoController from "../../controllers/todo.js";
export default function Route_Create_Todo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, dueDate } = req.body;
            const userId = req.user;
            if (!title || !userId) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            if (title.length < 3) {
                return res.status(400).json({ message: "Title must be at least 3 characters long!" });
            }
            const todo = yield TodoController.create({ title, description, dueDate, userId });
            return res.status(201).json({
                message: "Create todo successful!",
                data: todo
            });
        }
        catch (error) {
            console.error('Create todo error:', error);
            return res.status(500).json({
                message: "Create todo failed!",
                error: error.message,
            });
        }
    });
}
//# sourceMappingURL=create.js.map