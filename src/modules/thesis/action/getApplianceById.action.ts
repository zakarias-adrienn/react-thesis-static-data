import { Application, applicationSchema } from "../model/application.model";

const Joi = require("joi");

export type getApplianceByIdAction = {
  type: "get-appliance";
  payload: {
    applianceId: string;
  };
  response: {
    application: Application;
  };
};

export const getApplianceByIdActionSchema = {
  type: "get-appliance",
  payload: {
    applianceId: Joi.string().required()
  },
  response: {
    application: applicationSchema
  }
};
