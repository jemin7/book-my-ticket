import ApiResponse from "../../common/utils/api-response.js"
import * as userService from "./user.service.js"

const register = async () => {
    const user = await userService.register(req.body)
    ApiResponse.created(res, "Sign Up successfull",user)
}


export {register}