import { Request, Response } from "express";
import userService from "../service/userService";

//* 유저 정보(이름) 수정
const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name) {
    return res
      .status(400)
      .json({ status: 400, message: "유저 정보를 찾지 못함" });
  }
  const updatedUser = await userService.updateUser(+userId, name);
  return res
    .status(200)
    .json({ status: 200, message: "유저 정보 업데이트 성공", updatedUser });
};

const userController = { updateUser };

export default userController;
