const Joi = require("joi");

import { technologiesSchema, Technology } from "../model/technologies.model";

// dropdownokban kell megjelenítenem
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
