import { technologiesSchema, Technology } from "../model/technologies.model";

const Joi = require("joi");

// technologyApi.update(id, {name:"JAVAFX"})
export type modifyTechnologyAction = {
  type: "modify-technology";
  payload: {
    technologyId: string;
    name: string;
  };
  response: {
    technologyCreated: Technology;
  };
};

export const modifyTechnologyActionSchema = {
  type: "modify-technology",
  payload: {
    technologyId: Joi.string().required(),
    name: Joi.string().required()
  },
  response: {
    technologyCreated: technologiesSchema
  }
};
