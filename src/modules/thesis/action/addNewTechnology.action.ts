import { technologiesSchema, Technology } from "../model/technologies.model";

const Joi = require("joi");

// apisan: technologyApi.add({name: something});
export type addNewTechnologyAction = {
  type: "add-technology";
  payload: {
    name: string;
  };
  response: {
    technologyCreated: Technology;
  };
};

export const addNewTechnologyActionSchema = {
  type: "add-technology",
  payload: {
    name: Joi.string().required()
  },
  response: {
    technologyCreated: technologiesSchema
  }
};
