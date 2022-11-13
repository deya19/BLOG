import express from "express";
import {deletePostAdmin} from "../controllers/adminUser.js";
const router = express.Router();



router.delete("/:id",deletePostAdmin)


export default router;
