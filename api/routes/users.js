import express from "express";
import { getUser, updateUsers } from "../controllers/users.js";
const router = express.Router();


router.get("/:id",getUser);
router.put("/:id",updateUsers);

export default router;