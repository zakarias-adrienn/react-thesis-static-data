const Joi = require("joi");

export type Technology = {
  id: string;
  name: string;
  // connectedTopicIds: string[],
};

export const technologiesSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
  // connectedTopicIds: Joi.array().items(Joi.string())
});
