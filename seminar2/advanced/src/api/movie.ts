import express, { Request, Response } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const getMovie = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "영화 조회 성공",
    data: {
      movieName: "헤어질 결심",
      date: "2022-XX-XX",
    },
  });
};

export default getMovie;
