import express, { Request, Response } from "express";
import movie from "../data/movieData";

const getMovies = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "영화 조회 성공",
    data: movie,
  });
};

export default getMovies;
