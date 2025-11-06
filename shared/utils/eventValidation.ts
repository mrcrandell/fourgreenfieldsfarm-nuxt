import Joi from "joi";

export const eventValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  slug: Joi.string().required().messages({
    "string.empty": "URL slug is required",
    "any.required": "URL slug is required",
  }),
  startDate: Joi.date().optional(),
  startTime: Joi.string().optional(),
  startsAt: Joi.date().required().messages({
    "date.base": "Start date is required",
    "any.required": "Start date is required",
  }),
  endTime: Joi.string().optional(),
  endsAt: Joi.date().min(Joi.ref("startsAt")).required().messages({
    "date.base": "End date is required",
    "date.min": "End date must be after or equal to start date",
    "any.required": "End date is required",
  }),
  description: Joi.string().allow("").optional(),
  hauntedBy: Joi.string().allow("").optional(),
  isAllDay: Joi.boolean().default(false),
  isHasEndsAt: Joi.boolean().default(false),
  isFeatured: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true),
  isRecurring: Joi.boolean().default(false),
  recurrenceRule: Joi.string().when("isRecurring", {
    is: true,
    then: Joi.string().required().messages({
      "string.empty": "Recurrence rule is required for recurring events",
      "any.required": "Recurrence rule is required for recurring events",
    }),
    otherwise: Joi.string().allow("").optional(),
  }),
  recurrenceEnds: Joi.string().valid("NEVER", "COUNT", "UNTIL").allow(null)
    .optional(),
  recurringFrequency: Joi.string().valid("DAILY", "WEEKLY", "MONTHLY", "YEARLY")
    .when("isRecurring", {
      is: true,
      then: Joi.required().messages({
        "any.only": "Please select a valid frequency",
        "any.required": "Frequency is required for recurring events",
      }),
      otherwise: Joi.optional(),
    }),
  recurringInterval: Joi.number().min(1).when("isRecurring", {
    is: true,
    then: Joi.required().messages({
      "number.base": "Interval must be a number",
      "number.min": "Interval must be at least 1",
      "any.required": "Interval is required for recurring events",
    }),
    otherwise: Joi.optional(),
  }),
  recurringCount: Joi.number().min(1).allow(null).optional().messages({
    "number.base": "Count must be a number",
    "number.min": "Count must be at least 1",
  }),
  recurringEndDate: Joi.date().min(Joi.ref("startsAt")).allow(null).optional()
    .messages({
      "date.min": "End date must be after start date",
    }),
  scope: Joi.string().valid("single", "future", "all").optional(),
});
