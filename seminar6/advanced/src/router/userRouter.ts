import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controller";

const router: Router = Router();

//* 유저 생성 - POST api/users
router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.createUser
);
//* 유저 로그인 - POST api/users/signin
router.post(
  "/signin",
  [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.signInUser
);

//* 유저 이름 수정 PATCH /api/users/:userId
router.patch("/:userId", userController.updateUser);

export default router;
