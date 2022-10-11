import express, { Request, Response } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const getUsers = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "유저 조회 성공",
    data: {
      name: "강민재",
      age: 24,
    },
  });
};

export default getUsers;
