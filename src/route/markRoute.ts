import { Router } from "express";
import markController from "../controllers/markController"
const router = Router();

router.post("/",markController.createMark)
router.get("/:id",markController.getMarkByStudentId)
router.delete("/:id",markController.deleteMark)

export default router;