import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    username: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9_]{4,25}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Username must be 4-25 characters long and contain only letters, numbers, and underscores (no spaces).",
      }),

    email: Joi.string().email().lowercase().max(200).required(),

    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password cannot exceed 128 characters.",
        "string.pattern.base":
          "Password must be strong: include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
  });
}

export default RegisterDto;
