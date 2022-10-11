import express, { Request, Response } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const getComment = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "댓글 조회 성공",
    data: "2차 세미나 재밌어요!",
  });
};

export default getComment;
