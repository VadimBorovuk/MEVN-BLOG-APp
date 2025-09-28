import express from "express";
import {protectRoute} from "../middlewares/auth.middleware.js";
import {checkAuth, login, signUp, updateProfile} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/check", protectRoute, checkAuth);
router.put("/update_profile", protectRoute, updateProfile);

export default router;
