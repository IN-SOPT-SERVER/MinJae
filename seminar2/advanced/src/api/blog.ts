import express, { Request, Response } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const getBlogs = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "블로그 조회 성공",
    data: "블로그 작성 중입니다 !",
  });
};

export default getBlogs;
