import { Router } from "express";
import { userController } from "../controller";

const router: Router = Router();

//* 이름으로 유저 검색 - GET api/user.search?keyword={}
router.get('/search', userController.searchUserByName);


router.get("/:userId", userController.getUserById);

//* 유저 생성 - POST api/user
router.post("/", userController.createUser);

//* 유저 정보 업데이트 - PATCH api/user/:userId
router.patch("/:userId", userController.updateUser);

//* 유저 삭제 - DELETE api/user/:userId
router.delete("/:userId", userController.deleteUser);



export default router;
