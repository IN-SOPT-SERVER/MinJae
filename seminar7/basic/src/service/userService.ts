import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (userName: string, email: string, age: number) => {
  const data = await prisma.user.create({
    data: {
      userName,
      email,
      age,
    },
  });
  return data;
};

//* 유저 전체 조회
const getAllUser = async(page: number, limit: number) => {
  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  return data;
};

//* 유저 정보 업데이트
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

//* 유저 삭제
const deleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

//* 이름으로 유저 조회 (query)
const searchUserByName = async (keyword: string, option: string) => {

  if (option === 'desc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword,
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    
    return data;
  }

  if (option === 'asc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword
        }
      },
      orderBy: {
        createdAt: 'asc',
      }
    });
    
    return data;
  }

  if (option === 'nameDesc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword
        }
      },
      orderBy: {
        userName: 'desc',
      }
    });
    
    return data;
  }

};

const userService = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUserByName
};

export default userService;
