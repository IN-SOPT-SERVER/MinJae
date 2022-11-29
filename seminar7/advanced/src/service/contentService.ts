import { ContentCreateDto } from './../interfaces/Content/ContentCreateDto';
import { LikeContentCreateDto } from "./../interfaces/Content/LikeContentCreateDto";
import { ContentResponseDto } from "./../interfaces/Content/ContentResponseDto";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createContent = async (contentCreateDto: ContentCreateDto) => {
  const data = await prisma.content.create({
    data: {
      contentName: contentCreateDto.contentName,
      genre: contentCreateDto.genre,
      ageLimit: contentCreateDto.ageLimit,
      image: contentCreateDto.image,
    },
  });
  return data;
}
const getContent = async (
  contentId: number,
  episode: number,
): Promise<ContentResponseDto[]> => {
  const data = await prisma.content.findMany({
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
  contentId: number,
): Promise<ContentResponseDto[]> => {
  const data = await prisma.content.findMany({
    where: {
      id: contentId,
    },
    include: {
      episode: true,
    },
  });
  return data;
};

const getAllContents = async(page: number, limit: number) => {
  const data = await prisma.content.findMany({
    skip: (page - 1) * limit,
    take: limit,
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

const searchContentByName = async (keyword: string) => {
    const data = await prisma.content.findMany({
      where: {
        contentName: {
          contains: keyword,
        },
      },
    });

    return data;
  }

const contentService = {
  createContent,
  getContent,
  getAllContentsInfo,
  getAllContents,
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
  searchContentByName,
};

export default contentService;
