const Joi = require("joi");

export type Student = {
  id: string;
  name: string;
};

export const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
});
