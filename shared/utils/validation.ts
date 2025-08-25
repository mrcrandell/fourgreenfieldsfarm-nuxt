import Joi from "joi";

export const contactValidationSchema = Joi.object().keys({
  name: Joi.string().trim().required().messages({
    "string.empty": "Please enter your name.",
    "any.required": "Please enter your name.",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email.",
      "string.empty": "Please enter your email.",
      "any.required": "Please enter your email.",
    }),
  phone: Joi.string().trim().required().messages({
    "string.empty": "Please enter your phone number.",
    "any.required": "Please enter your phone number.",
  }),
  message: Joi.string()
    .trim()
    .required()
    .regex(/\w+(?:\s+\w+)+/)
    .messages({
      "string.pattern.base": "Please enter more than one word.",
      "string.empty": "Please enter a message.",
      "any.required": "Please enter a message.",
    }),
  token: Joi.string().trim().required(),
});
