import { Router } from "express";
import studentRoute from "./studentRoute"
import markRoute from "./markRoute"
import userRoute from "./userRoute"

const router = Router();

router.use("/student",studentRoute)
router.use("/mark",markRoute)
router.use("/user",userRoute)

export default router;