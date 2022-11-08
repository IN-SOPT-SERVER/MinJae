import { Router } from "express";
import { contentController } from "../controller";

const router: Router = Router();

//* 찜한 콘텐츠 생성 POST api/contents/like/:userId
router.post("/like/:userId", contentController.createLikeContent);
//* 찜한 콘텐츠 조회 GET api/contents/like/:userId
router.get("/like/:userId", contentController.getLikeContents);
//* 찜한 콘텐츠 삭제 DELETE api/contents/like/:likeContentId
router.delete("/like/:likeContentId", contentController.deleteLikeContents);

export default router;
