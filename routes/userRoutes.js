import express from "express";

import {
  signup,
  login,
  getAll,
  getUserById,
} from "../controllers/userController.js";
import { plans, subscription } from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.get("/getall", getAll);
router.get("/getuserbyid/:id", getUserById);
router.post("/plans", plans);
router.post("/subscribe/:planId", subscription);

export default router;
