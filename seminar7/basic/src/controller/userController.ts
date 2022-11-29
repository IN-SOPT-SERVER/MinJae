import { Request, Response } from "express";
import { message, statusCode } from "../constants";
import { success, fail } from "../constants/response";
import { userService } from "../service";

//* 유저 생성
const createUser = async (req: Request, res: Response) => {
  const { userName, email, age } = req.body;

  if (!userName || !email) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }

  const data = await userService.createUser(userName, email, age);

  if (!data) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }
  return res.status(200).json({ status: 200, message: "유저 생성 성공", data });
};

//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const data = await userService.getAllUser(Number(page),Number(limit));
  return res
    .status(200)
    .json({ status: 200, message: "유저 전체 조회 성공", data });
};

//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }
  const updatedUser = await userService.updateUser(+userId, name);
  return res
    .status(200)
    .json({ status: 200, message: "유저 정보 업데이트 성공", updatedUser });
};

//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userService.deleteUser(+userId);
  return res.status(200).json({ status: 200, message: "유저 정보 삭제 성공" });
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* GET ~/api/user?keyword=민재
const searchUserByName = async (req: Request, res: Response) => {
  const { keyword, option} = req.query;

  const data = await userService.searchUserByName(keyword as string, option as string);

  if (!data) {
    return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.SEARCH_USER_FAIL)); 
  }

  return res.status(statusCode.OK).send(success(statusCode.OK, message.SEARCH_USER_SUCCESS, data));
}

const userController = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUserByName
};

export default userController;
