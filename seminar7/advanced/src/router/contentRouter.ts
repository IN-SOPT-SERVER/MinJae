import { Router } from "express";
import { contentController } from "../controller";
import { auth, upload } from "../middlewares";

const router: Router = Router();

//* 콘텐츠 이름 검색 조회 GET /api/content/search
router.get('/search', contentController.searchContentByName);

//* 콘텐츠 생성 POST api/content
router.post("/", upload.single("file"), contentController.createContent);
//* 콘텐츠 내용 조회  GET api/content/:contentId
router.get("/:contentId", contentController.getContent);
//* 콘텐츠 내용 전체 조회 GET api/content
router.get("/", contentController.getAllContents);
//* 찜한 콘텐츠 생성 POST api/content/like/:userId
router.post("/like/:userId", auth, contentController.createLikeContent);
//* 찜한 콘텐츠 조회 GET api/content/like/:userId
router.get("/like/:userId", auth, contentController.getLikeContents);
//* 찜한 콘텐츠 삭제 DELETE api/content/like/:likeContentId
router.delete(
  "/like/:likeContentId",
  auth,
  contentController.deleteLikeContent
);

export default router;
