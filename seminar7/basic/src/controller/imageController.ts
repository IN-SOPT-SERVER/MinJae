import { Request, Response } from "express";
import { message, statusCode } from "../constants";
import { success, fail } from "../constants/response";
import imageService from "../service/imageService";

const uploadImage = async (req: Request, res: Response) => {
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;

  if (!location) {
    res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.NO_IMAGE));
  }
  const data = await imageService.uploadImage(location);

  if (!data) {
    res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.CREATE_IMAGE_FAIL));
  }

  return res.status(statusCode.CREATED).send(success(statusCode.CREATED, message.CREATE_IMAGE_SUCCESS, data));
}

const imageController = {
  uploadImage
}

export default imageController;
