import { Technology, technologiesSchema } from "../model/technologies.model";

const Joi = require("joi");

export type getTechnologyByIdAction = {
  type: "get-technology";
  payload: {
    technologyId: string;
  };
  response: {
    technology: Technology;
  };
};

export const getTechnologyByIdActionSchema = {
  type: "get-technology",
  payload: {
    technologyId: Joi.string().required()
  },
  response: {
    technology: technologiesSchema
  }
};
