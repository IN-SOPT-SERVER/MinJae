import express, { Router } from "express";
import getUsers from "../api/user";

const router: Router = express.Router();

router.get("/", getUsers);

export default router;
