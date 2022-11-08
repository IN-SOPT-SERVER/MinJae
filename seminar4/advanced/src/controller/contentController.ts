import { Request, Response } from "express";
import { contentService } from "../service";

//* 찜한 콘텐츠 생성
const createLikeContent = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { contentId } = req.body;

  if (!contentId) {
    return res
      .status(400)
      .json({ status: 400, message: "찜한 콘텐츠 생성 실패" });
  }

  const data = await contentService.createLikeContent(+userId, +contentId);
  return res
    .status(200)
    .json({ status: 200, message: "찜한 콘텐츠 생성 성공", data });
};

//* 찝한 콘텐츠 조회
const getLikeContents = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ status: 400, message: "유저를 찾을 수 없음" });
  }

  const data = await contentService.getLikeContents(+userId);
  return res
    .status(200)
    .json({ status: 200, message: "찜한 콘텐츠 조회 성공", data });
};

//* 찜한 콘텐츠 삭제
const deleteLikeContents = async (req: Request, res: Response) => {
  const { likeContentId } = req.params;

  await contentService.deleteLikeContent(+likeContentId);
  return res
    .status(200)
    .json({ status: 200, message: "찜한 콘텐츠 삭제 성공" });
};

const contentController = {
  createLikeContent,
  getLikeContents,
  deleteLikeContents,
};

export default contentController;
