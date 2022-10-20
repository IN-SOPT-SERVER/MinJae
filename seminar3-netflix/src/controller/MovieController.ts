import express, { Request, Response } from "express";
import { MovieService } from "../service";

const getMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const { episode } = req.query;
  const data = await MovieService.getMovie(movieId, episode as string);

  if (!data) {
    return res.status(404).json({ status: 404, message: "데이터가 없습니다." });
  }
  return res.status(200).json({ status: 200, message: "영화 조회 성공", data });
};

export default {getMovie};
