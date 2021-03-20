import { TopicType, Language, languageSchema, topicTypeSchema } from "../model/topics.model";

const Joi = require("joi");

// de a keresést is végül kliens oldalon oldom meg - nem kell a szerver hozzá!
export type SearchData = {
  title: string;
  connectedSubjectIds: string[];
  connectedTechnologyIds: string[];
  language: Language[];
  teacherId: string;
  type: TopicType[];
};

export const searchDataSchema = Joi.object({
  title: Joi.string().required(),
  connectedSubjectIds: Joi.array().items(Joi.string()),
  connectedTechnologyIds: Joi.array().items(Joi.string()),
  language: languageSchema,
  teacherId: Joi.string(),
  type: topicTypeSchema
});
