const Joi = require("joi");

export type Technology = {
  id: string;
  name: string;
};

export const technologiesSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
});
