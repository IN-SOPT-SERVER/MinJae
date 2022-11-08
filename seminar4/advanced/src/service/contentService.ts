const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    include: {
      Content: true,
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
  createLikeContent,
  getLikeContents,
  deleteLikeContent,
};

export default contentService;
