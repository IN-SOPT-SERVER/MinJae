import express, { Request, Response } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const getMembers = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "멤버 조회 성공",
    data: [
      {
        name: "권세훈",
        group: "ob",
      },
      {
        name: "강민재",
        group: "ob",
      },
      {
        name: "현세빈",
        group: "ob",
      },
      {
        name: "강수현",
        group: "ob",
      },
      {
        name: "김규원",
        group: "yb",
      },
      {
        name: "최윤한",
        group: "yb",
      },
      {
        name: "천호영",
        group: "yb",
      },
    ],
  });
};

export default getMembers;
