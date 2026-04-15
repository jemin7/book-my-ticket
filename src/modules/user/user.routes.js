import { Router } from "express";
import * as controller from "./user.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.js";

const router = Router();

router.post("/signup", validate(RegisterDto), controller.register);

export default router;
