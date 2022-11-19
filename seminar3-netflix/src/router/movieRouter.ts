import { Router } from "express";
import { MovieController } from "../controller";

const router = Router();

router.get("/:movieId", MovieController.getMovie);

export default router;
