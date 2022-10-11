import express, { Router } from "express";
import blogRouter from "./blogRouter";
import commentRouter from "./commentRouter";
import memberRouter from "./memberRouter";
import movieRouter from "./movieRouter";
import userRouter from "./userRouter";

const router: Router = express.Router(); // express 라우팅 시스템을 받아올거!

router.use("/blog", blogRouter);
router.use("/comment", commentRouter);
router.use("/member", memberRouter);
router.use("/movie", movieRouter);
router.use("/user", userRouter);

export default router; // 모듈로 반환
