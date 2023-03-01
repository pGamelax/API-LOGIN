import { Router } from "express";
const router = Router();

import { createUser, findAllUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleare.js";

router.post('/', authMiddleware, createUser);
router.get('/', authMiddleware, findAllUser)


export default router;
