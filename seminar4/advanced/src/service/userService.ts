const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* 유저의 정보(이름) 수정
const updateUser = async (userId: number, name: string) => {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userName: name,
    },
  });
  return data;
};

const userService = {
  updateUser,
};

export default userService;
