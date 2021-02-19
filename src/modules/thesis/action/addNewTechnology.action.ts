const Joi = require("joi");

import { technologiesSchema, Technology } from "../model/technologies.model";

export type addNewTechnologyAction = {
  type: "add-technology";
  payload: {
    name: string;
  };
  response: {
    technologyCreated: Technology; // lehet hogy kellene success? ha már van ilyen nevű technológia? vagy akkor üres obj?
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
