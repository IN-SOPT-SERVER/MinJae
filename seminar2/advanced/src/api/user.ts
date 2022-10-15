import express, { Request, Response } from "express";
import user from "../data/userData";

const getUsers = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "유저 조회 성공",
    data: user,
  });
};

export default getUsers;
