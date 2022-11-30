import { Router } from "express";
import { upload } from "../middlewares";
import { imageController } from "../controller";
const router: Router = Router();

router.post('/', upload.single("file"), imageController.uploadImage);
export default router;
