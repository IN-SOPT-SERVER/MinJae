import { Router } from "express";
import { MovieController } from "../controller";

const router = Router();

router.get("/:movieId", MovieController.getMovie);
router.get("/:movieId/:episodeId", MovieController.getEpisode);

export default router;
