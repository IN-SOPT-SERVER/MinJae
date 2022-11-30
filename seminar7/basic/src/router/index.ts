import { Router } from "express";
import imageRouter from "./imageRouter";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/image", imageRouter);

export default router;
