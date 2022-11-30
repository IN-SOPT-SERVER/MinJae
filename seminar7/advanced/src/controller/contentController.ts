import { ContentCreateDto } from './../interfaces/Content/ContentCreateDto';
import { LikeContentCreateDto } from "./../interfaces/Content/LikeContentCreateDto";
import { Request, Response } from "express";
import { message, statusCode } from "../constants";
import { success, fail } from "../constants/response";
import { contentService } from "../service";

//* 콘텐츠 생성
const createContent = async (req: Request, res: Response) => {
  const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
  const imageList = images.map((image: Express.MulterS3.File) => {
    return image.location;
  })

  const contentCreateDto: ContentCreateDto = {
      contentName: req.body.contentName,
      genre: req.body.genre,
      ageLimit: +(req.body.ageLimit),
      imageList: imageList,
  }
  
  if (!contentCreateDto) {
    res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.CREATE_CONTENT_FAIL));
  }
  const data = await contentService.createContent(contentCreateDto);

  if (!data) {
    return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.CREATE_CONTENT_FAIL));
  }

  return res
    .status(statusCode.CREATED)
    .send(success(statusCode.CREATED, message.CREATE_CONTENT_SUCCESS, data));
}

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
        Number(episode),
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

//* 콘텐츠 전체 정보 조회
const getAllContents = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const data = await contentService.getAllContents(Number(page),Number(limit));
  return res.status(statusCode.OK).send(success(statusCode.OK, message.READ_ALL_CONTENTS_SUCCESS, data));
}

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

//* 콘텐츠 이름 검색
const searchContentByName = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  const data = await contentService.searchContentByName( keyword as string );

  if (!data) {
    return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.SEARCH_CONTENT_FAIL)); 
  }

  return res.status(statusCode.OK).send(success(statusCode.OK, message.SEARCH_CONTENT_SUCCESS, data));
}

const contentController = {
  createContent,
  getContent,
  getAllContents,
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
  searchContentByName,
};

export default contentController;
