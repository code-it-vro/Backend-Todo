import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthentiacted } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthentiacted , newTask);
router.get("/my", isAuthentiacted , getMyTask);
router.route("/:id").put( isAuthentiacted , updateTask).delete( isAuthentiacted , deleteTask);

export default router;