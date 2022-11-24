import { LikeContentCreateDto } from "./../interfaces/common/Content/LikeContentCreateDto";
import { ContentResponseDto } from "./../interfaces/common/Content/ContentResponseDto";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getContent = async (
  contentId: number,
  episode: number
): Promise<ContentResponseDto[]> => {
  const data = await prisma.Content.findMany({
    where: {
      id: contentId,
    },
    include: {
      episode: {
        where: {
          episodeNumber: episode,
        },
      },
    },
  });
  return data;
};

const getAllContentsInfo = async (
  contentId: number
): Promise<ContentResponseDto[]> => {
  const data = await prisma.Content.findMany({
    where: {
      id: contentId,
    },
    include: {
      episode: true,
    },
  });
  return data;
};

const createLikeContent = async (
  userId: number,
  likeContentCreateDto: LikeContentCreateDto
) => {
  const data = await prisma.LikeContent.create({
    data: {
      userId,
      contentId: likeContentCreateDto.contentId,
    },
  });
  return data;
};

const getLikeContents = async (
  userId: number
): Promise<ContentResponseDto[]> => {
  const likeContents = await prisma.LikeContent.findMany({
    where: {
      userId,
    },
    select: {
      content: {
        select: {
          id: true,
          contentName: true,
          genre: true,
          ageLimit: true,
          episode: true,
        },
      },
    },
  });
  const data = await Promise.all(
    likeContents.map((likeContent: any) => {
      const result = {
        id: likeContent.content.id,
        contentId: likeContent.content.contentId,
        contentName: likeContent.content.contentName,
        genre: likeContent.content.genre,
        ageLimit: likeContent.content.ageLimit,
        episode: likeContent.content.episode,
      };
      return result;
    })
  );
  return data;
};

const deleteLikeContent = async (likeContentId: number) => {
  const data = await prisma.LikeContent.delete({
    where: { id: likeContentId },
  });
  return data;
};

const contentService = {
  getContent,
  getAllContentsInfo,
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
};

export default contentService;
