    import JOi from "joi";
    import BaseDto from "../../../common/dto/base.dto";
    import Joi from "joi";

    class RegisterDto extends BaseDto {
    static schema = Joi.object({
        first_name: JOi.string().trim().min(2).max(50).required(),
        last_name: JOi.string().trim().min(2).max(50).required(),
        username: JOi.string().trim().min(2).max(50).required(),
        eamil: Joi.string().eamil().lowercase().max(200).required(),
        password: Joi.string()
        .min(8)
        .max(128)
        .required()
        .message("Password muct contain 8 character"),
    });
    }

    export default RegisterDto;
