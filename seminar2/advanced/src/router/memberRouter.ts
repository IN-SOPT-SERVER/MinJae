import express, { Router } from "express";
import getMembers from "../api/member";

const router: Router = express.Router();

router.get("/", getMembers);

export default router;
