const Joi = require("joi");

export type Subject = {
  id: string;
  name: string;
};

// tantárgyak annak függvényében jelenjenek meg hogy milyen tanterven van?, mikor kezdte?
export const subjectSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
});
