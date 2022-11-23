import { Request, Response } from "express";
import { message, statusCode } from "../constants";
import { success, fail } from "../constants/response";

import { userService } from "../service";
import { UserUpdateDTO } from "./../interfaces/common/UserUpdateDto";
import { UserSignInDTO } from "../interfaces/common/UserSignInDto";
import { UserCreateDTO } from "../interfaces/common/UserCreateDto";

import { validationResult } from "express-validator";
import jwtHandler from "../modules/jwtHandler";

//* 유저 생성
const createUser = async (req: Request, res: Response) => {
  //? validation의 결과를 바탕으로 분기 처리
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }
  //? 기존 비구조화 할당 방식 -> DTO의 형태
  const userCreateDto: UserCreateDTO = req.body;
  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.SIGNUP_FAIL));
  }
  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.userName,
    accessToken,
  };

  return res
    .status(statusCode.CREATED)
    .send(success(statusCode.CREATED, message.SIGNUP_SUCCESS, result));
};

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const userId = await userService.signIn(userSignInDto);

    if (!userId)
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    else if (userId === statusCode.UNAUTHORIZED)
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(userId);

    const result = {
      id: userId,
      accessToken,
    };

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.SIGNIN_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
      );
  }
};

//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {
  const data = await userService.getAllUser();
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.READ_ALL_USERS_SUCCESS, data));
};

//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const userUpdateDto: UserUpdateDTO = req.body;
  const { userId } = req.params;

  if (!userUpdateDto) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.UPDATE_USER_FAIL));
  }
  const updatedUser = await userService.updateUser(+userId, userUpdateDto);
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.UPDATE_USER_SUCCESS, updatedUser));
};

//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userService.deleteUser(+userId);
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.DELETE_USER_SUCCESS));
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, message.READ_USER_FAIL));
  }
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, message.READ_USER_SUCCESS, data));
};

const userController = {
  createUser,
  signInUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
};

export default userController;
