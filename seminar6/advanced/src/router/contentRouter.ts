import { Router } from "express";
import { contentController } from "../controller";
import auth from "../middleware/auth";

const router: Router = Router();

//* 콘텐츠 내용 조회  GET api/contents/:contentId
router.get("/:contentId", contentController.getContent);
//* 찜한 콘텐츠 생성 POST api/contents/like/:userId
router.post("/like/:userId", auth, contentController.createLikeContent);
//* 찜한 콘텐츠 조회 GET api/contents/like/:userId
router.get("/like/:userId", auth, contentController.getLikeContents);
//* 찜한 콘텐츠 삭제 DELETE api/contents/like/:likeContentId
router.delete(
  "/like/:likeContentId",
  auth,
  contentController.deleteLikeContent
);

export default router;
