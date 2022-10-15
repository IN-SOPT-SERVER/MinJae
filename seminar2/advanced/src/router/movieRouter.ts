import express, { Router } from "express";
import getMovies from "../api/movie";

const router: Router = express.Router();

router.get("/", getMovies);

export default router;
