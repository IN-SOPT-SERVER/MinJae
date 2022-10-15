import express, { Request, Response } from "express";
import members from "../data/memberData";

const getMembers = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "멤버 조회 성공",
    data: members,
  });
};

export default getMembers;
