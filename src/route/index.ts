import { Router } from "express";
import studentRoute from "./studentRoute"
import markRoute from "./markRoute"

const router = Router();

router.use("/student",studentRoute)
router.use("/mark",markRoute)

export default router;