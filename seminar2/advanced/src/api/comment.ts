import express, { Request, Response } from "express";
import comment from "../data/commentData";

const getComment = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "댓글 조회 성공",
    data: comment,
  });
};

export default getComment;
