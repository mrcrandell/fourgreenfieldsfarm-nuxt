import Joi from "joi";

export const loginValidationSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email.",
      "string.empty": "Please enter your email.",
      "any.required": "Please enter your email.",
    }),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters.",
      "string.empty": "Please enter your password.",
      "any.required": "Please enter your password.",
    }),
  token: Joi.string().trim().required(),
});

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

export const changePasswordValidationSchema = Joi.object().keys({
  currentPassword: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.min": "Current password must be at least 6 characters.",
      "string.empty": "Please enter your current password.",
      "any.required": "Please enter your current password.",
    }),
  newPassword: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.min": "New password must be at least 6 characters.",
      "string.empty": "Please enter a new password.",
      "any.required": "Please enter a new password.",
    }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
      "string.empty": "Please confirm your new password.",
      "any.required": "Please confirm your new password.",
    }),
});
