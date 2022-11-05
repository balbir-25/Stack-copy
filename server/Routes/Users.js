import express from "express";

import { login, signup } from "../Controllers/Auth.js";
import { getAllUsers, updateProfile } from "../Controllers/Users.js";
import auth from "../Middleware/Auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
