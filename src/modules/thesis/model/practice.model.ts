import { Language, languageSchema } from "./topics.model";

const Joi = require("joi");

export type Practice = {
  id: string;
  company: string;
  contact: string; //lehetne email, név, telefonszám, weboldal
  connectedTechnologyIds: string[];
  description: string;
  place: string;
  language: Language[];
};

export const practiceSchema = Joi.object({
  // id: Joi.string().required(), - szerveroldal generálja
  connectedTechnologyIds: Joi.array().items(Joi.string()),
  company: Joi.string().required(),
  contact: Joi.string().required(),
  description: Joi.string().required(),
  place: Joi.string().required(),
  language: languageSchema
});
