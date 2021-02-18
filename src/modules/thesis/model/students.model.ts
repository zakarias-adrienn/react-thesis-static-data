const Joi = require("joi");

export type Student = {
  id: string;
  name: string;
  neptun: string;
  infIdentifier: string;
};

export const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  neptun: Joi.string().required(),
  infIdentifier: Joi.string().required()
});
