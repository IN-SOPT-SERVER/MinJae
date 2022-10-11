import express, { Router } from "express";
import getMovie from "../api/movie";

const router: Router = express.Router();

router.get("/", getMovie);

export default router;
