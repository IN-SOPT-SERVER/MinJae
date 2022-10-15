import express, { Request, Response } from "express";
import blog from "../data/blogData";

const getBlogs = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "블로그 조회 성공",
    data: blog,
  });
};

export default getBlogs;
