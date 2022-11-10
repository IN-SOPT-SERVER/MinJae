const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getContent = async (contentId: number, episode: number) => {
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

const createLikeContent = async (userId: number, contentId: number) => {
  const data = await prisma.LikeContent.create({
    data: {
      userId,
      contentId,
    },
  });
  return data;
};

const getLikeContents = async (userId: number) => {
  const data = await prisma.LikeContent.findMany({
    where: {
      userId,
    },
    select: {
      content: true,
    },
  });
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
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
};

export default contentService;
