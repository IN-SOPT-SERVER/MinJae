import { Router } from "express";
import imageRouter from "./imageRouter";
import userRouter from "./userRouter";
import contentRouter from './contentRouter';

const router: Router = Router();

router.use("/user", userRouter);
router.use('/content', contentRouter);
router.use("/image", imageRouter);

export default router;
