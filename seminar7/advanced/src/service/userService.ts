import bcrypt from "bcryptjs";
import { statusCode } from "../constants";
import { UserSignInDTO } from "../interfaces/User/UserSignInDto";
import { UserCreateDTO } from "../interfaces/User/UserCreateDto";
import { UserUpdateDTO } from "../interfaces/User/UserUpdateDto";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (userCreateDto: UserCreateDTO) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤 생성한 salt를 이용해 초기화

  const data = await prisma.user.create({
    data: {
      userName: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return data;
};

const signInUser = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return statusCode.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//* 유저의 정보(이름) 수정
const updateUser = async (userId: number, userUpdateDTO: UserUpdateDTO) => {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userName: userUpdateDTO.userName,
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
  signInUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUserByName,
};

export default userService;