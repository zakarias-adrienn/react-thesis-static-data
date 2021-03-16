import { technologiesSchema, Technology } from "../model/technologies.model";

const Joi = require("joi");

// technologiesApi.getAll()
export type getTechnologiesAction = {
  type: "get-technologies";
  payload: {};
  response: {
    technologies: Technology[];
  };
};

export const getTechnologiesActionSchema = {
  type: "get-technologies",
  payload: {},
  response: {
    technologies: Joi.array().items(technologiesSchema)
  }
};
