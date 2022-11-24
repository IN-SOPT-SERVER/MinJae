import { LikeContentCreateDto } from "./../interfaces/common/Content/LikeContentCreateDto";
import { Request, Response } from "express";
import { message, statusCode } from "../constants";
import { success, fail } from "../constants/response";
import { contentService } from "../service";

//* 콘텐츠 정보 조회
const getContent = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const { episode } = req.query;

  let type: "episode" | null;
  if (episode) {
    type = "episode";
  } else {
    type = null;
  }

  if (!contentId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }
  switch (type) {
    case "episode": {
      const data = await contentService.getContent(
        +contentId,
        +(episode as string)
      );

      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.READ_CONTENT_SUCCESS, data));
    }
    case null: {
      const data = await contentService.getAllContentsInfo(+contentId);
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.READ_CONTENT_SUCCESS, data));
    }
  }
};

//* 찜한 콘텐츠 생성
const createLikeContent = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const likeContentCreateDto: LikeContentCreateDto = req.body;

  if (!likeContentCreateDto) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  const data = await contentService.createLikeContent(
    +userId,
    likeContentCreateDto
  );
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.CREATE_LIKE_CONTENT_SUCCESS, data));
};

//* 찝한 콘텐츠 조회
const getLikeContents = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  const data = await contentService.getLikeContents(+userId);

  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.READ_LIKE_CONTENT_SUCCESS, data));
};

//* 찜한 콘텐츠 삭제
const deleteLikeContent = async (req: Request, res: Response) => {
  const { likeContentId } = req.params;

  await contentService.deleteLikeContent(+likeContentId);
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.DELETE_LIKE_CONTENT_SUCCESS));
};

const contentController = {
  getContent,
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
};

export default contentController;
