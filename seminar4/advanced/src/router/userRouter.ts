import { Router } from "express";
import { userController } from "../controller";

const router: Router = Router();

//* 유저 이름 수정 PATCH /api/users/:userId
router.patch("/:userId", userController.updateUser);

export default router;
