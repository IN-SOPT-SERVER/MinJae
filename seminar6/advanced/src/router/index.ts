import { Router } from "express";
import contentRouter from "./contentRouter";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/contents", contentRouter);

export default router;
