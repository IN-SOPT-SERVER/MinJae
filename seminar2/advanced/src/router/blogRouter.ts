import express, { Router } from "express";
import getBlogs from "../api/blog";

const router: Router = express.Router();

router.get("/", getBlogs);

export default router;
