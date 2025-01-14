var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TodoController from '../../controllers/todo.js';
export default function Route_delete_Todo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const { id } = req.body;
            if (!userId || !id) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            const todos = yield TodoController.delete(id, userId);
            if (!todos) {
                return res.status(404).json({ message: "No todos found!" });
            }
            res.status(200).send({
                message: "Delete todo successful!",
                data: todos
            });
        }
        catch (error) {
            console.error('Delete todo error:', error);
            return res.status(500).json({
                message: "Delete todo failed!",
                error: error.message,
            });
        }
    });
}
//# sourceMappingURL=delete.js.map