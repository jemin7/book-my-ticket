import ApiResponse from "../../common/utils/api-response.js";
import * as userService from "./user.service.js";

const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    ApiResponse.created(res, "Sign Up successful", user);
  } catch (error) {
    next(error);
  }
};

export { register };
