import { Rounter } from "express";
import * as controller from "./user.controller.js"
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/Register.js";


const router = Rounter()


router.post("/signup", validate(RegisterDto), controller.register);